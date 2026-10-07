"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AgentId } from "@/components/swarm/types";

export const SWARM_AGENTS: { id: AgentId; name: string }[] = [
  { id: "scout", name: "Scout" },
  { id: "smith", name: "Smith" },
  { id: "copy", name: "Copy" },
  { id: "preview", name: "Preview" },
  { id: "exporter", name: "Exporter" },
];

export type SwarmAgentId = AgentId;

export interface SwarmWidgetProps {
  /** Pass only a real running agent. Omit or null when the swarm is idle. */
  activeAgentId?: SwarmAgentId | null;
  className?: string;
}

export function SwarmWidget({
  activeAgentId = null,
  className,
}: SwarmWidgetProps) {
  const activeAgent =
    activeAgentId === null
      ? undefined
      : SWARM_AGENTS.find((agent) => agent.id === activeAgentId);
  const isIdle = activeAgent === undefined;
  const statusLabel = isIdle ? "Swarm idle" : activeAgent.name;

  return (
    <section
      aria-labelledby="swarm-widget-heading"
      className={cn(
        "flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div className="flex min-w-0 items-center gap-4">
        <h2 id="swarm-widget-heading" className="sr-only">
          Swarm
        </h2>
        <ul
          aria-label="Swarm agents"
          className="flex items-center gap-1.5"
        >
          {SWARM_AGENTS.map((agent) => {
            const isActive = agent.id === activeAgent?.id;
            return (
              <li key={agent.id} className="flex items-center">
                <span
                  className={cn(
                    "inline-block h-2.5 w-2.5 rounded-full",
                    isActive
                      ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.65)] ring-2 ring-cyan-400/40 motion-safe:animate-pulse"
                      : "bg-zinc-600",
                  )}
                  aria-hidden="true"
                />
                <span className="sr-only">
                  {agent.name}, {isActive ? "running" : "idle"}
                </span>
              </li>
            );
          })}
        </ul>
        <p
          role="status"
          aria-live="polite"
          className={cn(
            "truncate text-sm font-medium",
            isIdle ? "text-zinc-400" : "text-amber-400",
          )}
        >
          {statusLabel}
        </p>
      </div>
      <Button
        asChild
        size="sm"
        className="shrink-0 bg-gradient-to-r from-amber-500 to-cyan-500 text-zinc-950 hover:scale-105"
      >
        <Link href="/swarm">Open command center</Link>
      </Button>
    </section>
  );
}
