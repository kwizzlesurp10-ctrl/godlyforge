"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { AgentCard } from "@/components/swarm/AgentCard";
import {
  AGENT_ROLE_COPY,
  type AgentId,
  type AgentStatus,
  type SwarmAgent,
} from "@/components/swarm/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const FORGE_LINE: AgentId[] = ["scout", "smith", "copy", "preview", "exporter"];

const AGENT_NAMES: Record<AgentId, string> = {
  scout: "Scout",
  smith: "Smith",
  copy: "Copy",
  preview: "Preview",
  exporter: "Exporter",
};

const STATUS_FLOW: AgentStatus[] = ["thinking", "forging", "done"];

const DEMO_TICK: Record<AgentId, Record<Exclude<AgentStatus, "idle" | "error">, string>> = {
  scout: {
    thinking: "Demo: reading niche signals",
    forging: "Demo: mapping audience",
    done: "Demo: scout handoff complete",
  },
  smith: {
    thinking: "Demo: outlining structure",
    forging: "Demo: smithing product bones",
    done: "Demo: structure ready",
  },
  copy: {
    thinking: "Demo: drafting sales narrative",
    forging: "Demo: writing page copy",
    done: "Demo: copy ready (samples labeled)",
  },
  preview: {
    thinking: "Demo: assembling mockups",
    forging: "Demo: laying out preview",
    done: "Demo: preview ready",
  },
  exporter: {
    thinking: "Demo: packing files",
    forging: "Demo: exporting PDF / MD / JSON",
    done: "Demo: export complete",
  },
};

const STEP_MS = 700;

function idleAgents(): SwarmAgent[] {
  return FORGE_LINE.map((id) => ({
    id,
    name: AGENT_NAMES[id],
    role: AGENT_ROLE_COPY[id],
    status: "idle" as const,
  }));
}

function patchAgent(
  agents: SwarmAgent[],
  id: AgentId,
  status: AgentStatus,
): SwarmAgent[] {
  return agents.map((agent) =>
    agent.id === id
      ? {
          ...agent,
          status,
          tick:
            status === "idle" || status === "error"
              ? undefined
              : DEMO_TICK[id][status],
        }
      : agent,
  );
}

export function SwarmCanvas() {
  const reduceMotion = useReducedMotion();
  const [agents, setAgents] = useState<SwarmAgent[]>(idleAgents);
  const [phase, setPhase] = useState<"idle" | "running" | "done">("idle");

  const active = useMemo(
    () => agents.find((agent) => agent.status === "thinking" || agent.status === "forging"),
    [agents],
  );

  const liveMessage = useMemo(() => {
    if (phase === "idle") return "Swarm idle";
    if (phase === "done") return "Demo run complete. Scout through Exporter are done.";
    if (active) return `${active.name} ${active.status}`;
    return "Demo run in progress";
  }, [phase, active]);

  useEffect(() => {
    if (phase !== "running") return;

    let cancelled = false;
    const timeouts: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = window.setTimeout(resolve, reduceMotion ? 0 : ms);
        timeouts.push(id);
      });

    void (async () => {
      for (const id of FORGE_LINE) {
        for (const status of STATUS_FLOW) {
          if (cancelled) return;
          setAgents((prev) => patchAgent(prev, id, status));
          await wait(STEP_MS);
        }
      }
      if (!cancelled) setPhase("done");
    })();

    return () => {
      cancelled = true;
      timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, [phase, reduceMotion]);

  const startDemo = useCallback(() => {
    setAgents(idleAgents());
    setPhase("running");
  }, []);

  const reset = useCallback(() => {
    setAgents(idleAgents());
    setPhase("idle");
  }, []);

  const isIdle = phase === "idle";

  return (
    <section aria-labelledby="swarm-canvas-heading" className="text-zinc-100">
      <h2 id="swarm-canvas-heading" className="sr-only">
        Forge line
      </h2>
      <p role="status" aria-live="polite" className="sr-only">
        {liveMessage}
      </p>

      {isIdle ? (
        <div className="mb-8 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-6 text-center">
          <Link
            href="/build"
            className="inline-flex min-h-11 items-center justify-center rounded-md px-3 text-lg font-semibold text-[#FFD700] underline decoration-[#22D3EE] decoration-2 underline-offset-4 hover:text-[#22D3EE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            Swarm idle — Start Forging
          </Link>
          <p className="mx-auto mt-3 max-w-md text-sm text-zinc-400">
            No live swarm is running. Open the builder to forge a product, or watch a local Scout
            → Exporter status demo. This demo does not report sales or revenue.
          </p>
        </div>
      ) : null}

      <div className="mb-6 flex flex-wrap items-center gap-3">
        {phase === "running" ? (
          <p className="text-sm font-medium text-[#22D3EE]">
            Demo: {active ? `${active.name} · ${active.status}` : "finishing"}
          </p>
        ) : null}
        {phase === "done" ? (
          <p className="text-sm font-medium text-[#FFD700]">Demo complete — Scout → Exporter</p>
        ) : null}
        {phase !== "running" ? (
          <Button
            type="button"
            onClick={startDemo}
            className="min-h-11 bg-gradient-to-r from-[#FFD700] to-[#22D3EE] text-zinc-950 hover:opacity-90"
          >
            {phase === "done" ? "Replay demo" : "Watch Scout → Exporter demo"}
          </Button>
        ) : (
          <Button
            type="button"
            variant="outline"
            disabled
            className="min-h-11 border-zinc-700 text-zinc-400"
          >
            Demo running
          </Button>
        )}
        {phase === "done" ? (
          <Button
            type="button"
            variant="outline"
            onClick={reset}
            className="min-h-11 border-zinc-700 text-zinc-100 hover:bg-zinc-900"
          >
            Reset to idle
          </Button>
        ) : null}
      </div>

      <ol className="flex flex-col gap-3 md:flex-row md:items-stretch md:gap-0">
        {agents.map((agent, index) => {
          const isActive =
            agent.status === "thinking" || agent.status === "forging";
          return (
            <li
              key={agent.id}
              className="flex min-w-0 flex-1 flex-col md:flex-row md:items-stretch"
            >
              <motion.div
                layout={!reduceMotion}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: reduceMotion ? 1 : isActive ? 1.02 : 1,
                }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 280, damping: 24 }
                }
                className="min-w-0 flex-1"
              >
                <AgentCard
                  agent={agent}
                  className={cn("h-full", isActive && "ring-1 ring-[#22D3EE]/40")}
                />
              </motion.div>
              {index < agents.length - 1 ? (
                <div
                  aria-hidden="true"
                  className="flex h-6 shrink-0 items-center justify-center md:h-auto md:w-8"
                >
                  <span className="block h-6 w-px bg-gradient-to-b from-[#FFD700] to-[#22D3EE] md:h-px md:w-8 md:bg-gradient-to-r" />
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
