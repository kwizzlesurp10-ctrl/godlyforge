import * as React from "react";

export function Card({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return <div className={`rounded-xl border border-zinc-800 bg-zinc-950 ${className}`.trim()} {...props} />;
}
