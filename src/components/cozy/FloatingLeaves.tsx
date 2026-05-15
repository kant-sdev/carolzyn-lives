import { Leaf } from "lucide-react";

const leaves = [
  { left: "8%", top: "10%", delay: "0s", size: 18 },
  { left: "18%", top: "30%", delay: "3s", size: 14 },
  { left: "82%", top: "8%", delay: "1.5s", size: 20 },
  { left: "92%", top: "40%", delay: "5s", size: 16 },
  { left: "60%", top: "5%", delay: "6.5s", size: 12 },
];

export function FloatingLeaves() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {leaves.map((l, i) => (
        <Leaf
          key={i}
          size={l.size}
          className="absolute text-sage/50 animate-leaf"
          style={{ left: l.left, top: l.top, animationDelay: l.delay }}
        />
      ))}
    </div>
  );
}