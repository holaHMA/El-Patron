// Papel picado: banderitas recortadas que se mecen sobre el hero.
const COLORS = ["var(--color-primary)", "var(--color-oro)"];

function Flag({ i }) {
  const id = `cut-${i}`;
  const zig = Array.from({ length: 9 }, (_, k) => `${k * 10},${k % 2 ? 90 : 96}`).join(" ");
  return (
    <svg viewBox="0 0 80 100" className="pp-flag h-24 w-20 shrink-0" style={{ animationDelay: `${(i % 7) * -0.6}s` }} aria-hidden="true">
      <defs>
        <mask id={id}>
          <polygon points={`0,0 80,0 ${zig.split(" ").reverse().join(" ")} 0,96`} fill="white" />
          <circle cx="40" cy="46" r="10" fill="black" />
          {Array.from({ length: 8 }, (_, k) => {
            const a = (k / 8) * Math.PI * 2;
            return <circle key={k} cx={40 + Math.cos(a) * 19} cy={46 + Math.sin(a) * 19} r="4.5" fill="black" />;
          })}
          {[14, 30, 50, 66].map((x) => (
            <rect key={x} x={x - 3} y="10" width="6" height="6" transform={`rotate(45 ${x} 13)`} fill="black" />
          ))}
          {[12, 24, 56, 68].map((x) => (
            <circle key={x} cx={x} cy="78" r="2.6" fill="black" />
          ))}
        </mask>
      </defs>
      <rect width="80" height="100" fill={COLORS[i % 2]} mask={`url(#${id})`} />
    </svg>
  );
}

export default function PapelPicado({ count = 18 }) {
  return (
    <div className="relative overflow-hidden" aria-hidden="true">
      <div className="absolute inset-x-0 top-1 h-px bg-foreground/40" />
      <div className="flex justify-center gap-3 pt-1">
        {Array.from({ length: count }, (_, i) => (
          <Flag key={i} i={i} />
        ))}
      </div>
    </div>
  );
}
