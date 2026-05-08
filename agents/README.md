# hf-agent-tools

Agent-oriented wrappers around the Hugging Face Hub CLI (`hf`): MCP tools, structured JSON results, native `hf download --dry-run`, and optional dispatch helpers for smolagents-style harnesses.

## Requirements

- Python 3.11+
- `hf` on `PATH` (install via `pip install huggingface_hub`)
- Optional: `HF_TOKEN` for gated assets and API whoami fallback

## Install (editable)

```bash
cd agents
pip install -e ".[dev]"
```

## Run the MCP server (stdio)

```bash
export PATH="$HOME/.local/bin:$PATH"
python -m hf_agent_tools
# or
hf-agent-mcp
```

Configure your MCP client to launch this command (same environment as above).

## Tools exposed

| MCP tool | Maps to |
|----------|---------|
| `hf_cli_version` | `hf version` |
| `hf_cli_env` | `hf env` |
| `hf_cli_whoami` | `hf auth whoami` with `/api/whoami-v2` fallback |
| `hf_cli_download` | `hf download …` including `--dry-run` when requested |
| `hf_cli_repo_ls` | `hf models|datasets|spaces ls --format json` |

## Smolagents / custom harness

Use `hf_agent_tools.smolagents_bridge.operation_map()` or `run_operation(name, arguments)` to reuse the same payloads without MCP.

## Tests

```bash
cd agents
pytest
```
