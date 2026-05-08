from __future__ import annotations

import os
import shutil
import subprocess
import urllib.error
import urllib.request
from dataclasses import dataclass
from typing import Sequence

from hf_agent_tools.result import Err, Ok, Result, err, ok


@dataclass(frozen=True, slots=True)
class HfProcessOutput:
    exit_code: int
    stdout: str
    stderr: str


@dataclass(frozen=True, slots=True)
class HfCommandError:
    message: str
    argv: list[str]
    exit_code: int | None
    stdout: str
    stderr: str
    hint: str


def resolve_hf_binary() -> Result[str, str]:
    """Locate `hf` on PATH."""

    path = shutil.which("hf")
    if path:
        return ok(path)
    return err("`hf` not found on PATH. Install with: pip install huggingface_hub")


def run_hf(
    argv: Sequence[str],
    *,
    timeout_seconds: float = 120.0,
    env: dict[str, str] | None = None,
) -> Result[HfProcessOutput, HfCommandError]:
    """Run `hf` with arguments after `hf`."""

    resolved = resolve_hf_binary()
    if resolved.tag == "err":
        err_msg = resolved.error
        return Err(
            tag="err",
            error=HfCommandError(
                message=err_msg,
                argv=["hf", *list(argv)],
                exit_code=None,
                stdout="",
                stderr="",
                hint="pip install huggingface_hub && ensure `hf` is on PATH.",
            ),
        )

    hf_bin = resolved.value
    full_argv = [hf_bin, *list(argv)]
    merged_env = os.environ.copy()
    if env:
        merged_env.update(env)
    merged_env.setdefault("HF_HUB_DISABLE_PROGRESS_BARS", "1")
    try:
        proc = subprocess.run(
            full_argv,
            capture_output=True,
            text=True,
            timeout=timeout_seconds,
            check=False,
            env=merged_env,
        )
    except subprocess.TimeoutExpired:
        return Err(
            tag="err",
            error=HfCommandError(
                message=f"Timed out after {timeout_seconds}s.",
                argv=full_argv,
                exit_code=None,
                stdout="",
                stderr="",
                hint="Retry with a smaller repo or increase timeout_seconds.",
            ),
        )
    except OSError as exc:
        return Err(
            tag="err",
            error=HfCommandError(
                message=str(exc),
                argv=full_argv,
                exit_code=None,
                stdout="",
                stderr="",
                hint="Verify permissions and that `hf` is executable.",
            ),
        )

    out = HfProcessOutput(
        exit_code=proc.returncode,
        stdout=proc.stdout or "",
        stderr=proc.stderr or "",
    )
    if proc.returncode == 0:
        return ok(out)

    return Err(
        tag="err",
        error=HfCommandError(
            message="`hf` exited with a non-zero status.",
            argv=full_argv,
            exit_code=proc.returncode,
            stdout=out.stdout,
            stderr=out.stderr,
            hint=_hint_for_argv(list(argv)),
        ),
    )


def _hint_for_argv(argv: list[str]) -> str:
    if not argv:
        return "hf --help"
    return f"hf {' '.join(argv)} --help"


def whoami_via_api(timeout_seconds: float = 20.0) -> Result[dict[str, object], str]:
    """Call Hub whoami JSON API using HF_TOKEN (agent-friendly, no TTY)."""

    token = os.environ.get("HF_TOKEN") or os.environ.get("HUGGING_FACE_HUB_TOKEN")
    if not token:
        return err("Set HF_TOKEN for API whoami when `hf auth` is unavailable.")

    req = urllib.request.Request(
        "https://huggingface.co/api/whoami-v2",
        headers={"Authorization": f"Bearer {token}"},
        method="GET",
    )
    try:
        with urllib.request.urlopen(req, timeout=timeout_seconds) as resp:
            raw = resp.read().decode("utf-8")
    except urllib.error.HTTPError as exc:
        return err(f"whoami HTTP {exc.code}: {exc.reason}")
    except OSError as exc:
        return err(f"whoami request failed: {exc}")

    import json

    try:
        data = json.loads(raw)
    except json.JSONDecodeError:
        return err("whoami returned non-JSON body.")

    if not isinstance(data, dict):
        return err("whoami returned unexpected JSON shape.")
    return ok(data)


def build_download_argv(
    repo_id: str,
    local_dir: str,
    repo_type: str,
    revision: str | None,
    *,
    dry_run: bool,
) -> list[str]:
    argv = [
        "download",
        repo_id,
        "--local-dir",
        local_dir,
        "--repo-type",
        repo_type,
    ]
    if revision:
        argv.extend(["--revision", revision])
    if dry_run:
        argv.append("--dry-run")
    return argv


def build_repo_ls_argv(
    repo_id: str,
    repo_type: str,
    revision: str | None,
) -> list[str]:
    """Build argv for listing remote repo files (matches current `hf` CLI)."""

    if repo_type == "model":
        argv: list[str] = ["models", "ls", repo_id, "--format", "json"]
    elif repo_type == "dataset":
        argv = ["datasets", "ls", repo_id, "--format", "json"]
    elif repo_type == "space":
        argv = ["spaces", "ls", repo_id, "--format", "json"]
    else:
        msg = f"Unsupported repo_type: {repo_type}"
        raise ValueError(msg)

    if revision:
        argv.extend(["--revision", revision])
    return argv
