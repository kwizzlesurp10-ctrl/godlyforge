"use client";

import type { LucideIcon } from "lucide-react";
import { AlertCircle, Check, Circle, Flame, Loader2 } from "lucide-react";
import type { ReactElement } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import type { AgentStatus, SwarmAgent } from "./types";

export interface AgentCardProps {
  agent: SwarmAgent;
  className?: string;
}

const STATUS_LABEL: Record<AgentStatus, string> = {
  idle: "Idle",
  thinking: "Thinking",
  forging: "Forging",
  done: "Done",
  error: "Error",
};

const STATUS_ICON: Record<AgentStatus, LucideIcon> = {
  idle: Circle,
  thinking: Loader2,
  forging: Flame,
  done: Check,
  error: AlertCircle,
};

const STATUS_PILL_CLASS: Record<AgentStatus, string> = {
  idle: "bg-zinc-800/80 text-zinc-400",
  thinking: "bg-cyan-500/15 text-[#22D3EE]",
  forging: "bg-amber-500/15 text-[#FFD700]",
  done: "bg-emerald-500/15 text-emerald-300",
  error: "bg-red-500/15 text-red-400",
};

export function AgentCard({ agent, className }: AgentCardProps): ReactElement {
  const statusLabel = STATUS_LABEL[agent.status];
  const StatusIcon = STATUS_ICON[agent.status];
  const isForging = agent.status === "forging";
  const isIdle = agent.status === "idle";

  return (
    <Card
      tabIndex={0}
      aria-label={`${agent.name}. ${agent.role}. Status: ${statusLabel}${agent.tick ? `. ${agent.tick}` : ""}`}
      className={cn(
        "p-4 text-zinc-100 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-amber-500/40",
        isForging
          ? "border-[#FFD700] shadow-[inset_0_0_0_1px_#22D3EE]"
          : isIdle
            ? "border-zinc-800/50 text-zinc-500"
            : "border-zinc-800",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className={cn("text-sm font-semibold", isIdle ? "text-zinc-500" : "text-zinc-100")}>
            {agent.name}
          </h3>
          <p className={cn("mt-0.5 truncate text-xs", isIdle ? "text-zinc-600" : "text-zinc-400")}>
            {agent.role}
          </p>
        </div>
        <span
          className={cn(
            "inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
            STATUS_PILL_CLASS[agent.status],
          )}
        >
          <StatusIcon
            aria-hidden="true"
            className={cn("h-3 w-3", agent.status === "thinking" && "animate-spin")}
          />
          {statusLabel}
        </span>
      </div>
      {agent.tick ? (
        <p className={cn("mt-2 text-xs", isIdle ? "text-zinc-600" : "text-zinc-400")} aria-live="polite">
          {agent.tick}
        </p>
      ) : null}
    </Card>
  );
}
