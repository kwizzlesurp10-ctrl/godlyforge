from hf_agent_tools.result import err, is_err, is_ok, ok


def test_ok_err_tags() -> None:
    o = ok(3)
    e = err("nope")
    assert is_ok(o)
    assert not is_err(o)
    assert o.value == 3
    assert is_err(e)
    assert e.error == "nope"
