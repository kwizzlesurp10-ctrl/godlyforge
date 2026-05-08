from __future__ import annotations

import json
from typing import Any

from hf_agent_tools.hf_runner import (
    HfCommandError,
    build_download_argv,
    build_repo_ls_argv,
    run_hf,
    whoami_via_api,
)
from hf_agent_tools.result import Err, Result
from hf_agent_tools.schemas import DownloadInput, RepoFilesInput


def _json_blob(payload: dict[str, Any]) -> str:
    return json.dumps(payload, indent=2, sort_keys=True)


def hf_version() -> str:
    """Return `hf version` output or structured error JSON."""

    result = run_hf(["version"], timeout_seconds=30.0)
    return _format_hf_result("hf_version", result)


def hf_env() -> str:
    """Return `hf env` output or structured error JSON."""

    result = run_hf(["env"], timeout_seconds=30.0)
    return _format_hf_result("hf_env", result)


def hf_download(payload: dict[str, Any]) -> str:
    """
    Run `hf download` with validated, non-interactive flags.

    Examples (via MCP tool arguments):
      {"repo_id": "gpt2", "local_dir": "./models/gpt2", "repo_type": "model"}
      {"repo_id": "org/ds", "local_dir": "./data", "repo_type": "dataset", "revision": "main"}
    """

    data = DownloadInput.model_validate(payload)
    argv = build_download_argv(
        data.repo_id,
        data.local_dir,
        data.repo_type,
        data.revision,
        dry_run=data.dry_run,
    )
    result = run_hf(argv, timeout_seconds=600.0)
    return _format_hf_result(
        "hf_download",
        result,
        extra={"planned_argv": ["hf", *argv], "dry_run": data.dry_run},
    )


def hf_repo_ls(payload: dict[str, Any]) -> str:
    """List remote repo files via `hf models|datasets|spaces ls --format json`."""

    data = RepoFilesInput.model_validate(payload)
    argv = build_repo_ls_argv(data.repo_id, data.repo_type, data.revision)
    result = run_hf(argv, timeout_seconds=120.0)
    return _format_hf_result(
        "hf_repo_ls",
        result,
        extra={"planned_argv": ["hf", *argv]},
    )


def hf_whoami() -> str:
    """Resolve current Hub identity via `hf auth whoami` or HF_TOKEN API fallback."""

    primary = run_hf(["auth", "whoami"], timeout_seconds=30.0)
    if primary.tag == "ok":
        return _json_blob(
            {
                "tool": "hf_whoami",
                "source": "hf_cli",
                "stdout": primary.value.stdout.strip(),
                "stderr": primary.value.stderr.strip(),
            },
        )

    fallback = whoami_via_api()
    if fallback.tag == "ok":
        return _json_blob(
            {
                "tool": "hf_whoami",
                "source": "api_whoami_v2",
                "profile": fallback.value,
            },
        )

    cli_err = primary.error
    api_err = fallback.error
    merged = HfCommandError(
        message="Could not resolve Hub identity.",
        argv=cli_err.argv,
        exit_code=cli_err.exit_code,
        stdout=cli_err.stdout,
        stderr=cli_err.stderr,
        hint=(
            "Fix CLI auth: `hf auth login` or set HF_TOKEN. "
            f"CLI error: {cli_err.message}. API error: {api_err}"
        ),
    )
    return _json_blob(_error_payload("hf_whoami", Err(tag="err", error=merged)))


def _format_hf_result(
    tool: str,
    result: Result[Any, HfCommandError],
    *,
    extra: dict[str, Any] | None = None,
) -> str:
    payload: dict[str, Any] = {"tool": tool}
    if extra:
        payload.update(extra)
    if result.tag == "ok":
        value = result.value
        payload.update(
            {
                "ok": True,
                "exit_code": value.exit_code,
                "stdout": value.stdout,
                "stderr": value.stderr,
            },
        )
        return _json_blob(payload)

    return _json_blob(_error_payload(tool, result))


def _error_payload(tool: str, result: Err[HfCommandError]) -> dict[str, Any]:
    e = result.error
    return {
        "tool": tool,
        "ok": False,
        "error": e.message,
        "argv": e.argv,
        "exit_code": e.exit_code,
        "stdout": e.stdout,
        "stderr": e.stderr,
        "hint": e.hint,
    }
