import { createContext, useContext } from "react";
import { cn } from "@/lib/utils";

export const AnnotCtx = createContext(true);

// Envuelve un bloque; en modo wireframe muestra contorno punteado y etiqueta.
export default function Zone({ label, className, labelClassName, children, as: Tag = "div", ...rest }) {
  const on = useContext(AnnotCtx);
  return (
    <Tag className={cn("relative", on && "outline-1 outline-dashed outline-offset-4 outline-anota/50", className)} {...rest}>
      {on && (
        <span className={cn("pointer-events-none absolute -top-4 left-2 z-10 rounded-sm bg-anota px-2 text-sm font-medium text-oro-ink", labelClassName)}>
          {label}
        </span>
      )}
      {children}
    </Tag>
  );
}

export function ImgSlot({ label, className }) {
  const on = useContext(AnnotCtx);
  return (
    <div className={cn("hatch relative flex items-center justify-center overflow-hidden rounded-md", className)}>
      <svg className="absolute inset-0 h-full w-full text-foreground/15" preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" />
      </svg>
      <span className={cn("relative rounded-sm bg-background/80 px-2 text-sm text-foreground/70", !on && "sr-only")}>IMG · {label}</span>
    </div>
  );
}

export function ScreenTag({ n, name }) {
  const on = useContext(AnnotCtx);
  if (!on) return null;
  return (
    <div className="mb-6 inline-flex items-center gap-2 rounded-sm border border-anota/60 px-2 py-1 text-sm text-anota">
      <span className="font-semibold">Pantalla {n} de 4</span>
      <span className="text-anota">·</span>
      <span>{name}</span>
    </div>
  );
}
