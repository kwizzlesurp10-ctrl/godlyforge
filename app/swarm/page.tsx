import type { Metadata } from "next";

import { SwarmCanvas } from "@/components/swarm/SwarmCanvas";

export const metadata: Metadata = {
  title: "Agent Swarm",
  description: "QMA² command center",
};

export default function SwarmPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-[#FFD700] md:text-5xl">
            Agent Swarm
          </h1>
          <p className="mt-2 text-lg text-[#22D3EE]">QMA² command center</p>
        </header>
        <SwarmCanvas />
      </div>
    </div>
  );
}
