from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, Field, field_validator


class DownloadInput(BaseModel):
    """Inputs for `hf download` (non-interactive)."""

    repo_id: str = Field(
        ...,
        description="Hub repo id, e.g. 'gpt2' or 'meta-llama/Llama-3.2-1B-Instruct'.",
        examples=["gpt2", "meta-llama/Llama-3.2-1B-Instruct"],
    )
    local_dir: str = Field(
        ...,
        description="Directory to download files into (created if missing).",
        examples=["./models/my-model"],
    )
    repo_type: Literal["model", "dataset", "space"] = Field(
        default="model",
        description="Kind of Hub repository.",
    )
    revision: str | None = Field(
        default=None,
        description="Optional git revision, branch, or tag.",
    )
    dry_run: bool = Field(
        default=False,
        description="If true, only validate inputs and return the argv that would run.",
    )

    @field_validator("repo_id")
    @classmethod
    def repo_id_nonempty(cls, value: str) -> str:
        stripped = value.strip()
        if not stripped:
            msg = "repo_id must be non-empty."
            raise ValueError(msg)
        return stripped

    @field_validator("local_dir")
    @classmethod
    def local_dir_nonempty(cls, value: str) -> str:
        if not value.strip():
            msg = "local_dir must be non-empty."
            raise ValueError(msg)
        return value


class RepoFilesInput(BaseModel):
    """Inputs for `hf repo-files` listing (read-only)."""

    repo_id: str = Field(..., description="Hub repository id.")
    repo_type: Literal["model", "dataset", "space"] = Field(default="model")
    revision: str | None = Field(default=None, description="Optional revision.")

    @field_validator("repo_id")
    @classmethod
    def repo_id_nonempty(cls, value: str) -> str:
        stripped = value.strip()
        if not stripped:
            msg = "repo_id must be non-empty."
            raise ValueError(msg)
        return stripped
