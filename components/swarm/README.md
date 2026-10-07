# Swarm dashboard widget

Compact strip for the GodlyForge dashboard. It shows five agent dots, **Swarm idle** (or a real active agent name), and a CTA to `/swarm`. It does **not** invent activity, revenue, or agent work.

Do not edit this widget into `Dashboard.tsx` or `Navbar.tsx` from this folder’s original task — those mounts are listed here so a follow-up can wire them.

## Mount in `components/Dashboard.tsx`

`Dashboard` is a client component. Import the widget directly (no barrel) and place the strip **between the header and the analytics (“Your GODLY Empire”) block**. Leave `activeAgentId` unset until a real swarm runtime exists.

```tsx
import { SwarmWidget } from "@/components/swarm/SwarmWidget";
```

```tsx
{/* Header */}
<div className="flex justify-between items-center mb-12">
  {/* existing header */}
</div>

<SwarmWidget className="mb-12" />

{/* Analytics Section */}
```

When an agent is actually running, pass its id from `SWARM_AGENTS`:

```tsx
<SwarmWidget className="mb-12" activeAgentId="forge" />
```

Valid ids: `scout` | `forge` | `copy` | `price` | `launch`. Do not pass a fabricated id to look “busy.”

## Add `/swarm` to the navbar

The widget links to `/swarm`. Add the same href to both nav lists (desktop + mobile). The route itself is not created here.

In `components/Navbar.tsx`, extend `navLinks`:

```ts
const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/ideas", label: "Ideas" },
  { href: "/build", label: "Build" },
  { href: "/library", label: "Library" },
  { href: "/swarm", label: "Swarm" },
];
```

In `components/MobileNav.tsx`, use the same `navLinks` entry so the command center is reachable on small screens.

Active styles already key off `pathname === link.href`, so `/swarm` highlights without extra CSS.
