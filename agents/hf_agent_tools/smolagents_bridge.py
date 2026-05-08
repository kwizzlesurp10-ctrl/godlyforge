from __future__ import annotations

from collections.abc import Callable
from typing import Any

from hf_agent_tools.operations import (
    hf_download,
    hf_env,
    hf_repo_ls,
    hf_version,
    hf_whoami,
)


def operation_map() -> dict[str, Callable[..., str]]:
    """Return Hub tool callables for custom smolagents or agent harness wiring."""

    return {
        "hf_cli_version": hf_version,
        "hf_cli_env": hf_env,
        "hf_cli_whoami": hf_whoami,
        "hf_cli_download": hf_download,
        "hf_cli_repo_ls": hf_repo_ls,
    }


def run_operation(name: str, arguments: dict[str, Any] | None = None) -> str:
    """Dispatch by name; accepts the same payloads as the MCP tool layer."""

    if name == "hf_cli_version":
        return hf_version()
    if name == "hf_cli_env":
        return hf_env()
    if name == "hf_cli_whoami":
        return hf_whoami()
    if name == "hf_cli_download":
        if arguments is None:
            msg = "hf_cli_download requires arguments."
            raise ValueError(msg)
        return hf_download(arguments)
    if name == "hf_cli_repo_ls":
        if arguments is None:
            msg = "hf_cli_repo_ls requires arguments."
            raise ValueError(msg)
        return hf_repo_ls(arguments)

    valid = ", ".join(sorted(operation_map()))
    msg = f"Unknown operation: {name}. Valid: {valid}"
    raise KeyError(msg)
