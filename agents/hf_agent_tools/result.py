from __future__ import annotations

from dataclasses import dataclass
from typing import Generic, Literal, TypeVar

T = TypeVar("T")
E = TypeVar("E")


@dataclass(frozen=True, slots=True)
class Ok(Generic[T]):
    """Successful outcome."""

    tag: Literal["ok"]
    value: T


@dataclass(frozen=True, slots=True)
class Err(Generic[E]):
    """Failed outcome."""

    tag: Literal["err"]
    error: E


Result = Ok[T] | Err[E]


def ok(value: T) -> Ok[T]:
    return Ok(tag="ok", value=value)


def err(error: E) -> Err[E]:
    return Err(tag="err", error=error)


def is_ok(result: Result[T, E]) -> bool:
    return result.tag == "ok"


def is_err(result: Result[T, E]) -> bool:
    return result.tag == "err"
