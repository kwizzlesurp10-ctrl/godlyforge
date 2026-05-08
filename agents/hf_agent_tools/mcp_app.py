from __future__ import annotations

from mcp.server.fastmcp import FastMCP

from hf_agent_tools import __version__
from hf_agent_tools.operations import (
    hf_download,
    hf_env,
    hf_repo_ls,
    hf_version,
    hf_whoami,
)

mcp = FastMCP(
    "hf-hub",
    instructions=(
        "Hugging Face Hub CLI (`hf`) wrappers for automation: non-interactive flags, "
        "structured JSON responses, dry-run on downloads. Requires `hf` on PATH and "
        "optionally HF_TOKEN for API fallback."
    ),
)


@mcp.tool()
def hf_cli_version() -> str:
    """Run `hf version`.

    Examples:
      (no arguments)
    """

    return hf_version()


@mcp.tool()
def hf_cli_env() -> str:
    """Run `hf env` for debugging PATH, Python, and Hub config.

    Examples:
      (no arguments)
    """

    return hf_env()


@mcp.tool()
def hf_cli_whoami() -> str:
    """Show Hub identity via `hf auth whoami`, falling back to HF_TOKEN /whoami-v2.

    Examples:
      (no arguments)
    """

    return hf_whoami()


@mcp.tool()
def hf_cli_download(
    repo_id: str,
    local_dir: str,
    repo_type: str = "model",
    revision: str | None = None,
    dry_run: bool = False,
) -> str:
    """Download a Hub repository via `hf download` using explicit flags (non-interactive).

    Examples:
      hf_cli_download(repo_id="gpt2", local_dir="./models/gpt2", repo_type="model")
      hf_cli_download(repo_id="org/ds", local_dir="./data/x", repo_type="dataset", revision="main")
      hf_cli_download(repo_id="gpt2", local_dir="./models/gpt2", dry_run=True)
    """

    return hf_download(
        {
            "repo_id": repo_id,
            "local_dir": local_dir,
            "repo_type": repo_type,
            "revision": revision,
            "dry_run": dry_run,
        },
    )


@mcp.tool()
def hf_cli_repo_ls(
    repo_id: str,
    repo_type: str = "model",
    revision: str | None = None,
) -> str:
    """List files for a remote Hub repo via `hf models|datasets|spaces ls --format json`.

    Examples:
      hf_cli_repo_ls(repo_id="gpt2", repo_type="model")
      hf_cli_repo_ls(repo_id="nvidia/ChatQA-Training-Data", repo_type="dataset")
    """

    return hf_repo_ls({"repo_id": repo_id, "repo_type": repo_type, "revision": revision})


def main() -> None:
    mcp.run(transport="stdio")


if __name__ == "__main__":
    main()
