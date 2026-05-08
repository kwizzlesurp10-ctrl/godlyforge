from unittest.mock import patch

import pytest

from hf_agent_tools.hf_runner import (
    build_download_argv,
    build_repo_ls_argv,
    run_hf,
)
from hf_agent_tools.result import is_ok


def test_build_download_argv_includes_dry_run() -> None:
    argv = build_download_argv("gpt2", "./m", "model", None, dry_run=True)
    assert argv[0] == "download"
    assert argv[1] == "gpt2"
    assert "--dry-run" in argv
    assert "--local-dir" in argv


def test_build_repo_ls_argv_model() -> None:
    assert build_repo_ls_argv("x/y", "model", None) == [
        "models",
        "ls",
        "x/y",
        "--format",
        "json",
    ]


def test_build_repo_ls_argv_with_revision() -> None:
    out = build_repo_ls_argv("x/y", "dataset", "v1")
    assert out[:2] == ["datasets", "ls"]
    assert "--revision" in out
    assert "v1" in out


def test_build_repo_ls_invalid() -> None:
    with pytest.raises(ValueError):
        build_repo_ls_argv("x", "nope", None)  # type: ignore[arg-type]


@patch("hf_agent_tools.hf_runner.shutil.which")
@patch("subprocess.run")
def test_run_hf_success(mock_run, mock_which) -> None:
    mock_which.return_value = "/usr/bin/hf"
    mock_run.return_value = type(
        "P",
        (),
        {"returncode": 0, "stdout": "ok\n", "stderr": ""},
    )()

    result = run_hf(["version"], timeout_seconds=5.0)
    assert is_ok(result)
    if is_ok(result):
        assert result.value.stdout == "ok\n"
        assert result.value.exit_code == 0


@patch("hf_agent_tools.hf_runner.shutil.which")
def test_run_hf_missing_binary(mock_which) -> None:
    mock_which.return_value = None
    result = run_hf(["version"])
    assert result.tag == "err"
    assert result.error.argv[0] == "hf"
