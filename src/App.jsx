/*
  Subject: "El Patrón", antojería urbana de enchiladas y tacos artesanales. Audiencia: clientes que piden por WhatsApp desde el cel.
  Job: wireframe navegable de 4 pantallas (Inicio, Menú, Contacto/Multimedia, Pedido) con el look final.
  Artifact robado: el rótulo de taquería de noche + papel picado. Letra gótica tipo rotulación chicana (Pirata One) sobre comal negro.
  Type: Pirata One (display) · Fira Sans (texto).
  Color: comal negro (fondo) · masa (texto) · rojo guajillo (CTA, primary) · dorado (logo, precios, anotaciones) · verde WhatsApp (solo el botón final).
  Layout: navbar fija → hero con papel picado + nombre gigante → sazón → menú en tarjetas por categoría → contacto + video grande → carrito + formulario.
  Signature: papel picado recortado meciéndose sobre "El Patrón"; brasas subiendo en el contenedor de video.
*/
import { useMemo, useState } from "react";
import "./styles.css";
import { ShoppingBag, Flame, Wheat, Soup, Plus, Minus, Trash2, Instagram, Facebook, Music2, MessageCircle, Play, Clock, MapPin, Check } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import PapelPicado from "./parts/PapelPicado";
import Zone, { AnnotCtx, ImgSlot, ScreenTag } from "./parts/Zone";
import { categories, allItems, SHIPPING, money } from "./data";

const NAV = [
  { id: "inicio", label: "Inicio" },
  { id: "menu", label: "Menú" },
  { id: "contacto", label: "Contacto" },
  { id: "pedido", label: "Tu pedido" },
];
const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
const WA = "+52 55 1234 5678";

export default function App() {
  const [annot, setAnnot] = useState(true);
  const [cart, setCart] = useState({ "tac-pastor": 2, "enc-verdes": 1 });
  const count = Object.values(cart).reduce((a, b) => a + b, 0);

  const add = (id) => {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
    toast.success(`${allItems[id].name} agregado`, { action: { label: "Ver pedido", onClick: () => go("pedido") } });
  };
  const setQty = (id, q) =>
    setCart((c) => {
      const n = { ...c };
      if (q <= 0) delete n[id];
      else n[id] = q;
      return n;
    });

  return (
    <AnnotCtx.Provider value={annot}>
      <div className="@container min-h-screen bg-background text-foreground">
        <Navbar count={count} annot={annot} setAnnot={setAnnot} />
        <Hero />
        <Menu cart={cart} add={add} />
        <Contact />
        <Checkout cart={cart} setQty={setQty} clear={() => setCart({})} />
        <footer className="border-t border-foreground/10 px-6 py-8">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
            <span className="font-display text-3xl text-oro">El Patrón</span>
            <span>Antojitos mexicanos hechos a mano · Pedidos por WhatsApp {WA}</span>
          </div>
        </footer>
        <Toaster richColors position="bottom-right" />
      </div>
    </AnnotCtx.Provider>
  );
}

function Navbar({ count, annot, setAnnot }) {
  return (
    <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/90 backdrop-blur">
      <Zone label="Navbar" labelClassName="top-auto -bottom-3" className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-3">
        <button type="button" onClick={() => go("inicio")} className="flex items-center gap-2" aria-label="El Patrón, inicio">
          <span className="flex size-10 items-center justify-center rounded-full border-2 border-oro font-display text-2xl text-oro">P</span>
          <span className="font-display text-3xl leading-none text-oro">El Patrón</span>
        </button>
        <nav className="ml-auto hidden items-center gap-1 @3xl:flex">
          {NAV.map((n) => (
            <Button key={n.id} variant="ghost" size="sm" onClick={() => go(n.id)}>
              {n.label}
            </Button>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-4 @3xl:ml-0">
          <div className="hidden items-center gap-2 @xl:flex">
            <Switch id="annot" checked={annot} onCheckedChange={setAnnot} />
            <Label htmlFor="annot" className="text-sm text-muted-foreground">Anotaciones</Label>
          </div>
          <Button onClick={() => go("pedido")} className="relative" aria-label={`Carrito, ${count} productos`}>
            <ShoppingBag /> Pedido
            <span className="ml-1 rounded-full bg-oro px-2 text-sm font-semibold text-oro-ink tabular-nums">{count}</span>
          </Button>
        </div>
      </Zone>
    </header>
  );
}

const SAZON = [
  { icon: Wheat, title: "Tortilla al momento", text: "Maíz nixtamalizado en casa, palmeado y al comal." },
  { icon: Soup, title: "Salsas de molcajete", text: "Martajadas cada mañana, nunca de frasco." },
  { icon: Flame, title: "Carbón de encino", text: "Carnes marinadas 24 horas y asadas a la brasa." },
];

function Hero() {
  return (
    <section id="inicio" className="scroll-mt-16">
      <PapelPicado />
      <div className="mx-auto max-w-6xl px-6 pt-12 pb-24">
        <ScreenTag n={1} name="Inicio · Landing / Hero" />
        <Zone label="Hero" className="grid gap-12 @5xl:grid-cols-[1.15fr_1fr] @5xl:items-end">
          <div>
            <p className="text-lg tracking-widest text-oro uppercase">Antojería artesanal</p>
            <h1 className="font-display text-[clamp(5rem,16cqw,11rem)] leading-[0.85] text-foreground">
              El <span className="text-chile">Patrón</span>
            </h1>
            <p className="mt-6 max-w-md text-xl text-foreground/85">
              Antojitos mexicanos auténticos. Especialistas en <strong className="text-oro">enchiladas</strong> y <strong className="text-oro">tacos</strong> hechos a mano, todos los días.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="h-14 px-8 text-lg" onClick={() => go("menu")}>
                Ver Menú / Ordenar Ahora
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-6 text-lg" onClick={() => go("contacto")}>
                <MessageCircle /> WhatsApp
              </Button>
            </div>
          </div>
          <img
          src="tacos.avif"
          alt= "orden de tacos al pastor en el comal" className="aspect-[4/3] w-full" />
        </Zone>

        <Zone label="Presentación del sazón" className="mt-24 grid gap-8 rounded-lg bg-barro p-8 @3xl:grid-cols-[1fr_2fr] @3xl:p-12">
          <div>
            <h2 className="font-display text-5xl leading-none text-oro">El sazón de la casa</h2>
            <p className="mt-4 text-foreground/75">Recetas de familia, ingredientes del mercado y cero atajos.</p>
          </div>
          <div className="grid gap-6 @xl:grid-cols-3">
            {SAZON.map(({ icon: Icon, title, text }) => (
              <div key={title}>
                <Icon className="size-8 text-primary" />
                <h3 className="mt-3 text-lg font-semibold">{title}</h3>
                <p className="mt-1 text-foreground/80">{text}</p>
              </div>
            ))}
          </div>
        </Zone>
      </div>
    </section>
  );
}

function Menu({ cart, add }) {
  return (
    <section id="menu" className="scroll-mt-16 border-t border-foreground/10 bg-barro/40">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <ScreenTag n={2} name="Menú de alimentos" />
        <h2 className="font-display text-7xl leading-none">Nuestro Menú</h2>
        <div className="mt-16 flex flex-col gap-24">
          {categories.map((cat) => (
            <Zone key={cat.id} label={`Categoría · ${cat.name}`} as="article">
              <div className="grid gap-6 border-b-2 border-primary pb-6 @3xl:grid-cols-[auto_1fr] @3xl:items-end @3xl:gap-12">
                <h3 className="font-display text-6xl leading-none text-oro">{cat.name}</h3>
                <div>
                  <p className="text-lg text-foreground/80">{cat.blurb}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-sm text-muted-foreground">{cat.id === "tacos" ? "Preparaciones:" : "Variantes:"}</span>
                    {cat.extras.map((e) => (
                      <Badge key={e} variant="outline">{e}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-8 grid gap-6 @xl:grid-cols-2 @5xl:grid-cols-3">
                {cat.items.map((it) => (
                  <Dish key={it.id} it={it} qty={cart[it.id] || 0} add={add} />
                ))}
              </div>
            </Zone>
          ))}
        </div>
      </div>
    </section>
  );
}

function Dish({ it, qty, add }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-foreground/10 bg-barro transition hover:border-oro/50">
      <img 
        src={it.image || "/tcp.webp"} 
        alt={it.name} 
        className="aspect-[16/10] w-full object-cover rounded-none" 
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h4 className="font-display text-3xl leading-none">{it.name}</h4>
          <span className="text-xl font-semibold text-oro tabular-nums">{money(it.price)}</span>
        </div>
        <p className="mt-2 flex-1 text-foreground/80">{it.desc}</p>
        <div className="mt-4 flex items-center justify-between gap-2">
          <div className="flex gap-1">
            {it.tags.map((t) => (
              <Badge key={t} variant="secondary">{t}</Badge>
            ))}
          </div>
          <Button size="sm" variant={qty ? "default" : "outline"} onClick={() => add(it.id)}>
            {qty ? <><Check /> {qty} en pedido</> : <><Plus /> Agregar</>}
          </Button>
        </div>
      </div>
    </div>
  );
}

const SOCIAL = [
  { name: "Instagram", icon: Instagram, handle: "@elpatron.antojitos" },
  { name: "Facebook", icon: Facebook, handle: "/ElPatronAntojitos" },
  { name: "TikTok", icon: Music2, handle: "@elpatron.mx" },
];

function Embers() {
  const embers = useMemo(
    () => Array.from({ length: 22 }, (_, i) => ({
      left: `${(i * 37) % 100}%`, size: 2 + (i % 4), dur: `${5 + (i % 6)}s`, delay: `${-(i * 0.7)}s`, drift: `${((i % 5) - 2) * 18}px`,
    })),
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {embers.map((e, i) => (
        <span key={i} className="ember" style={{ left: e.left, width: e.size, height: e.size, "--dur": e.dur, "--drift": e.drift, animationDelay: e.delay }} />
      ))}
    </div>
  );
}

function Contact() {
  const [playing, setPlaying] = useState(false);
  return (
    <section id="contacto" className="scroll-mt-16 border-t border-foreground/10">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <ScreenTag n={3} name="Contacto y multimedia" />
        <h2 className="font-display text-7xl leading-none">Contáctanos y Conócenos</h2>
        <div className="mt-12 grid gap-12 @5xl:grid-cols-[1fr_1.8fr]">
          <Zone label="Bloque de contacto" className="flex flex-col gap-6">
            <button
              type="button"
              onClick={() => toast(`Abriría WhatsApp: ${WA}`)}
              className="group flex items-center gap-4 rounded-lg bg-whatsapp p-6 text-left text-whatsapp-ink transition hover:brightness-110"
            >
              <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-background/20">
                <MessageCircle className="size-7" />
              </span>
              <span>
                <span className="block text-sm opacity-90">Pedidos por WhatsApp</span>
                <span className="block text-2xl font-semibold tabular-nums">{WA}</span>
              </span>
            </button>
            <div className="flex flex-col gap-3">
              {SOCIAL.map(({ name, icon: Icon, handle }) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => toast(`Enlace a ${name}: ${handle}`)}
                  className="flex items-center gap-4 rounded-lg border border-foreground/15 bg-barro px-4 py-3 text-left transition hover:border-oro hover:text-oro"
                >
                  <Icon className="size-6" />
                  <span className="font-semibold">{name}</span>
                  <span className="ml-auto text-sm text-muted-foreground">{handle}</span>
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-2 text-foreground/75">
              <span className="flex items-center gap-2"><Clock className="size-4 text-oro" /> Lunes a domingo, 1:00 pm a 11:00 pm</span>
              <span className="flex items-center gap-2"><MapPin className="size-4 text-oro" /> Dirección del local (mapa opcional)</span>
            </div>
          </Zone>

          <Zone label="Video incrustado · 16:9" className="flex flex-col">
            <div className="relative aspect-video overflow-hidden rounded-lg bg-[oklch(0.12_0.012_40)] ring-1 ring-oro/30">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_110%,oklch(0.52_0.2_25/0.45),transparent_65%)]" />
              <Embers />
              <span className="absolute top-4 left-4 rounded-sm bg-primary px-2 text-sm font-semibold tracking-wider text-primary-foreground uppercase">
                {"<video>"} embebido
              </span>
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pausar video" : "Reproducir video"}
                className="absolute top-1/2 left-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-oro bg-background/40 text-oro backdrop-blur transition hover:scale-105"
              >
                {playing ? <span className="flex gap-2"><span className="h-8 w-2 bg-oro" /><span className="h-8 w-2 bg-oro" /></span> : <Play className="size-10 translate-x-0.5 fill-current" />}
              </button>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-4">
                <div className="h-1 rounded-full bg-foreground/20">
                  <div className={cn("h-1 rounded-full bg-oro transition-all duration-[8000ms] ease-linear", playing ? "w-full" : "w-[12%]")} />
                </div>
                <div className="mt-2 flex justify-between text-sm text-foreground tabular-nums">
                  <span>{playing ? "reproduciendo" : "0:18"}</span>
                  <span>2:45</span>
                </div>
              </div>
            </div>
            <h3 className="mt-6 font-display text-4xl leading-none text-oro">Del nixtamal al comal</h3>
            <p className="mt-2 text-foreground/75">El proceso artesanal de la casa: masa, salsas de molcajete y el trompo al pastor.</p>
          </Zone>
        </div>
      </div>
    </section>
  );
}

const PAY = [
  { v: "efectivo", label: "Efectivo" },
  { v: "transferencia", label: "Transferencia" },
  { v: "tarjeta", label: "Tarjeta al entregar" },
];

function Checkout({ cart, setQty, clear }) {
  const [form, setForm] = useState({ nombre: "", direccion: "", telefono: "" });
  const [pago, setPago] = useState("efectivo");
  const [tried, setTried] = useState(false);
  const [sent, setSent] = useState(null);
  const lines = Object.entries(cart).map(([id, q]) => ({ ...allItems[id], q }));
  const subtotal = lines.reduce((a, l) => a + l.price * l.q, 0);
  const total = lines.length ? subtotal + SHIPPING : 0;

  const errors = {
    nombre: !form.nombre.trim() && "Escribe tu nombre.",
    direccion: !form.direccion.trim() && "¿A dónde te lo llevamos?",
    telefono: form.telefono.replace(/\D/g, "").length !== 10 && "Teléfono de 10 dígitos.",
  };
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const confirm = () => {
    setTried(true);
    if (!lines.length) return toast.error("Tu pedido está vacío. Agrega algo del menú.");
    if (Object.values(errors).some(Boolean)) return;
    const msg = [
      `¡Hola El Patrón! Quiero ordenar:`,
      ...lines.map((l) => `• ${l.q} × ${l.name} (${money(l.price * l.q)})`),
      `Envío: ${money(SHIPPING)}`,
      `Total: ${money(total)}`,
      `Pago: ${PAY.find((p) => p.v === pago).label}`,
      `Nombre: ${form.nombre}`,
      `Dirección: ${form.direccion}`,
      `Tel: ${form.telefono}`,
    ].join("\n");
    setSent(msg);
  };

  return (
    <section id="pedido" className="scroll-mt-16 border-t border-foreground/10 bg-barro/40">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <ScreenTag n={4} name="Carrito y checkout" />
        <h2 className="font-display text-7xl leading-none">Tu Pedido</h2>
        <div className="mt-12 grid gap-12 @5xl:grid-cols-[1.3fr_1fr] @5xl:items-start">
          <Zone label="Resumen del carrito" className="rounded-lg border border-foreground/10 bg-barro p-6">
            {lines.length ? (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Platillo</TableHead>
                      <TableHead className="text-center">Cantidad</TableHead>
                      <TableHead className="text-right">Subtotal</TableHead>
                      <TableHead className="w-10"><span className="sr-only">Quitar</span></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lines.map((l) => (
                      <TableRow key={l.id}>
                        <TableCell>
                          <div className="font-semibold">{l.name}</div>
                          <div className="text-sm text-muted-foreground">{l.category} · {money(l.price)} c/orden</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-center gap-2">
                            <Button size="icon" variant="outline" className="size-8" onClick={() => setQty(l.id, l.q - 1)} aria-label={`Quitar uno de ${l.name}`}><Minus /></Button>
                            <span className="w-6 text-center tabular-nums">{l.q}</span>
                            <Button size="icon" variant="outline" className="size-8" onClick={() => setQty(l.id, l.q + 1)} aria-label={`Agregar uno de ${l.name}`}><Plus /></Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-semibold tabular-nums">{money(l.price * l.q)}</TableCell>
                        <TableCell>
                          <Button size="icon" variant="ghost" className="size-8" onClick={() => setQty(l.id, 0)} aria-label={`Eliminar ${l.name}`}><Trash2 /></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-6 flex flex-col gap-2 border-t border-foreground/10 pt-6 tabular-nums">
                  <div className="flex justify-between text-foreground/75"><span>Subtotal</span><span>{money(subtotal)}</span></div>
                  <div className="flex justify-between text-foreground/75"><span>Envío</span><span>{money(SHIPPING)}</span></div>
                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="text-lg">Total</span>
                    <span className="font-display text-5xl text-oro">{money(total)}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <ShoppingBag className="size-10 text-muted-foreground" />
                <p className="text-lg">Tu pedido está vacío.</p>
                <Button variant="outline" onClick={() => go("menu")}>Ir al menú</Button>
              </div>
            )}
          </Zone>

          <Zone label="Formulario del cliente" className="rounded-lg border border-foreground/10 bg-barro p-6">
            <FieldGroup>
              <Field data-invalid={tried && !!errors.nombre || undefined}>
                <FieldLabel htmlFor="nombre">Nombre</FieldLabel>
                <Input id="nombre" placeholder="¿Cómo te llamas?" value={form.nombre} onChange={set("nombre")} aria-invalid={tried && !!errors.nombre} />
                {tried && errors.nombre && <FieldError className="text-error-chile">{errors.nombre}</FieldError>}
              </Field>
              <Field data-invalid={tried && !!errors.direccion || undefined}>
                <FieldLabel htmlFor="direccion">Dirección de entrega</FieldLabel>
                <Textarea id="direccion" rows={2} placeholder="Calle, número, colonia y referencias" value={form.direccion} onChange={set("direccion")} aria-invalid={tried && !!errors.direccion} />
                {tried && errors.direccion && <FieldError className="text-error-chile">{errors.direccion}</FieldError>}
              </Field>
              <Field data-invalid={tried && !!errors.telefono || undefined}>
                <FieldLabel htmlFor="telefono">Teléfono</FieldLabel>
                <InputGroup>
                  <InputGroupAddon><InputGroupText>+52</InputGroupText></InputGroupAddon>
                  <InputGroupInput id="telefono" inputMode="numeric" placeholder="55 0000 0000" value={form.telefono} onChange={set("telefono")} onKeyDown={(e) => e.key === "Enter" && confirm()} aria-invalid={tried && !!errors.telefono} />
                </InputGroup>
                {tried && errors.telefono && <FieldError className="text-error-chile">{errors.telefono}</FieldError>}
              </Field>
              <Field>
                <FieldLabel>Método de pago</FieldLabel>
                <ToggleGroup type="single" variant="outline" value={pago} onValueChange={(v) => v && setPago(v)} className="w-full flex-wrap">
                  {PAY.map((p) => (
                    <ToggleGroupItem key={p.v} value={p.v} className="flex-1 data-[state=on]:bg-oro data-[state=on]:text-oro-ink">
                      {p.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </Field>
            </FieldGroup>
            <button
              type="button"
              onClick={confirm}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-lg bg-whatsapp px-6 py-4 text-lg font-semibold text-whatsapp-ink shadow-[0_8px_30px_-8px_var(--color-whatsapp)] transition hover:brightness-110 active:scale-[0.99]"
            >
              <MessageCircle className="size-6" /> Confirmar Pedido por WhatsApp
            </button>
            <p className="mt-3 text-center text-sm text-muted-foreground">Te llega el resumen listo para enviar al {WA}</p>
          </Zone>
        </div>
      </div>

      <Dialog open={!!sent} onOpenChange={(o) => !o && setSent(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display text-4xl text-oro">¡Pedido listo!</DialogTitle>
            <DialogDescription>Así se enviaría el mensaje por WhatsApp a El Patrón.</DialogDescription>
          </DialogHeader>
          <pre className="rounded-lg bg-whatsapp/15 p-4 font-sans text-base whitespace-pre-wrap text-foreground">{sent}</pre>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSent(null)}>Editar</Button>
            <Button onClick={() => { setSent(null); clear(); toast.success("Pedido enviado. ¡Provecho!"); }}>Enviar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );

}
