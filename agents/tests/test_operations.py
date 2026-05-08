import json
from unittest.mock import patch

from hf_agent_tools.hf_runner import HfProcessOutput
from hf_agent_tools.operations import hf_download, hf_repo_ls, hf_version
from hf_agent_tools.result import ok


@patch("hf_agent_tools.operations.run_hf")
def test_hf_version_json_shape(mock_run) -> None:
    mock_run.return_value = ok(
        HfProcessOutput(exit_code=0, stdout="1.2.3", stderr=""),
    )

    out = hf_version()
    data = json.loads(out)
    assert data["ok"] is True
    assert data["tool"] == "hf_version"


@patch("hf_agent_tools.operations.run_hf")
def test_hf_download_dry_run_uses_cli_flag(mock_run) -> None:
    mock_run.return_value = ok(
        HfProcessOutput(exit_code=0, stdout="dry", stderr=""),
    )

    hf_download(
        {
            "repo_id": "gpt2",
            "local_dir": "./m",
            "repo_type": "model",
            "dry_run": True,
        },
    )
    argv = mock_run.call_args[0][0]
    assert argv[-1] == "--dry-run"


@patch("hf_agent_tools.operations.run_hf")
def test_hf_repo_ls_dispatches_models(mock_run) -> None:
    mock_run.return_value = ok(
        HfProcessOutput(exit_code=0, stdout="[]", stderr=""),
    )
    out = hf_repo_ls({"repo_id": "gpt2", "repo_type": "model"})
    argv = mock_run.call_args[0][0]
    assert argv[:3] == ["models", "ls", "gpt2"]
    data = json.loads(out)
    assert data["ok"] is True
    assert data["tool"] == "hf_repo_ls"
