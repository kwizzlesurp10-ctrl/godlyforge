import pytest

from hf_agent_tools.smolagents_bridge import operation_map, run_operation


def test_operation_map_keys() -> None:
    keys = set(operation_map())
    assert "hf_cli_version" in keys
    assert "hf_cli_download" in keys


def test_run_operation_unknown() -> None:
    with pytest.raises(KeyError):
        run_operation("nope")


def test_run_operation_requires_payload() -> None:
    with pytest.raises(ValueError):
        run_operation("hf_cli_download")
