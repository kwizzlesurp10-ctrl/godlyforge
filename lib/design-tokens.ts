export const tokens = {
  colors: {
    gold: "#FFD700",
    cyan: "#22D3EE",
    indigo: "#1E1438",
    background: "#0A0A0A",
    foreground: "#EDEDED",
  },
  gradients: {
    hero: "linear-gradient(90deg, #FFD700, #22D3EE)",
    button: "linear-gradient(90deg, #FFD700, #22D3EE)",
  },
  spacing: {
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "3rem",
  },
} as const;

export type ColorToken = keyof typeof tokens.colors;