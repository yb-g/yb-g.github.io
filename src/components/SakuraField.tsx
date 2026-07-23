import { useEffect, useState } from "react";

type Petal = {
  id: number;
  left: string;
  size: number;
  duration: string;
  delay: string;
  drift: string;
  rotate: string;
};

export function SakuraField({ count = 14 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const arr: Petal[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 10 + Math.random() * 16,
      duration: `${14 + Math.random() * 16}s`,
      delay: `-${Math.random() * 20}s`,
      drift: `${(Math.random() - 0.5) * 40}vw`,
      rotate: `${Math.random() * 360}deg`,
    }));
    setPetals(arr);
  }, [count]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {petals.map((p) => (
        <svg
          key={p.id}
          className="sakura"
          width={p.size}
          height={p.size}
          viewBox="0 0 24 24"
          style={{
            left: p.left,
            animationDuration: p.duration,
            animationDelay: p.delay,
            ["--drift" as string]: p.drift,
          }}
        >
          <path
            d="M12 2c1.5 3 3.5 4.5 6.5 5-3 .5-5 2-6.5 5-1.5-3-3.5-4.5-6.5-5 3-.5 5-2 6.5-5z"
            fill="oklch(0.78 0.12 340 / 0.85)"
          />
        </svg>
      ))}
    </div>
  );
}
