export type AgentId = "scout" | "smith" | "copy" | "preview" | "exporter";

export type AgentStatus = "idle" | "thinking" | "forging" | "done" | "error";

export interface SwarmAgent {
  id: AgentId;
  name: string;
  role: string;
  status: AgentStatus;
  tick?: string;
}

export interface SwarmRun {
  id: string;
  productTitle?: string;
  agents: SwarmAgent[];
  startedAt?: string;
  finishedAt?: string;
}

export const AGENT_ROLE_COPY: Record<AgentId, string> = {
  scout: "Scout niches/audience",
  smith: "Smith product structure",
  copy: "Copy sales page (sample testimonials labeled)",
  preview: "Preview mockups/pricing",
  exporter: "Exporter PDF/MD/JSON",
};
