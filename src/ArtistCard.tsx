import { ReactNode, useEffect, useRef, useState } from "react";
import { avatarImage, galleryImage1 } from "./imageData";

type TabId = "inicio" | "precios" | "galeria" | "ocs";

type Tab = {
  id: TabId;
  label: string;
  icon: ReactNode;
};

type LinkItem = {
  label: string;
  icon: ReactNode;
  href?: string;
};

type PriceTier = {
  tier: string;
  amount: string;
  desc: string;
};

type OcItem = {
  emoji: string;
  name: string;
  pronouns: string;
  desc: string;
  tags: string[];
};

const tabs: Tab[] = [
  { id: "inicio", label: "Inicio", icon: <HomeIcon /> },
  { id: "precios", label: "Precios", icon: <TagIcon /> },
  { id: "galeria", label: "Galeria", icon: <ImageIcon /> },
  { id: "ocs", label: "OCs", icon: <UsersIcon /> },
];

const links: LinkItem[] = [
  { label: "Instagram", href: "https://www.instagram.com/_frgttn", icon: <InstagramIcon /> },
  { label: "Twitter / X", icon: <XIcon /> },
  { label: "Comisiones", icon: <HeartIcon /> },
];

const artStyles = ["Fanart", "OCs", "Chibi", "Anime", "Portraits"];

const prices: PriceTier[] = [
  { tier: "Sketch", amount: "$5", desc: "Boceto digital, sin color, 1 personaje" },
  { tier: "Lineart", amount: "$10", desc: "Linea limpia, sin color, 1 personaje" },
  { tier: "Chibi", amount: "$12", desc: "Estilo chibi, color plano, 1 personaje" },
  { tier: "Busto", amount: "$18", desc: "Busto completo con color y sombras" },
  { tier: "Half body", amount: "$25", desc: "Medio cuerpo con color completo" },
  { tier: "Full body", amount: "$35", desc: "Cuerpo completo con fondo simple incluido" },
];

const galleryItems = [
  { src: galleryImage1, label: "pieza reciente" },
  { src: avatarImage, label: "retrato" },
];

const ocs: OcItem[] = [
  {
    emoji: "🌙",
    name: "Lunara",
    pronouns: "ella/her",
    desc: "Bruja del crepusculo. Colecciona estrellas caidas y suenos ajenos.",
    tags: ["magia", "oscuridad", "melancolica"],
  },
  {
    emoji: "🌸",
    name: "Hana",
    pronouns: "ella/her",
    desc: "Espiritu del cerezo. Aparece en primavera y nunca recuerda el ano anterior.",
    tags: ["naturaleza", "dulce", "misterio"],
  },
  {
    emoji: "🔥",
    name: "Kairo",
    pronouns: "el/him",
    desc: "Exguardian del fuego. Viaja buscando la llama que perdio.",
    tags: ["accion", "serio", "leal"],
  },
  {
    emoji: "🐇",
    name: "Mochi",
    pronouns: "elle/them",
    desc: "Ladron de corazones literales. Los colecciona en tarros de cristal.",
    tags: ["caos", "adorable", "travieso"],
  },
];

export default function ArtistCard() {
  const [activeTab, setActiveTab] = useState<TabId>("inicio");

  return (
    <main className="cursor-none select-none h-screen overflow-hidden bg-[repeating-linear-gradient(90deg,#1a0010_0px,#1a0010_18px,#1f0015_18px,#1f0015_36px)] px-3 py-2 font-serif text-[#4b1830] sm:px-6 lg:px-10">
      <CursorEffects />
      <section className="mx-auto flex h-full max-w-[990px] items-center">
        <div className="flex h-[calc(100vh-1rem)] w-full rounded-[28px] border-2 border-[#c06080] bg-[#1f000e] p-1 shadow-[0_20px_70px_rgba(80,0,35,0.45)]">
          <div className="flex min-h-0 w-full flex-col overflow-hidden rounded-[22px] border border-[#c06080] bg-[#150008]">
            <WindowChrome activeTab={activeTab} onTabChange={setActiveTab} />
            <HeroBanner />
            <div className="h-[18px] shrink-0 border-y border-[#c06080] bg-[repeating-linear-gradient(90deg,transparent_0px,transparent_6px,#d4607a_6px,#d4607a_8px,transparent_8px,transparent_14px),repeating-linear-gradient(180deg,transparent_0px,transparent_4px,#d4607a_4px,#d4607a_6px,transparent_6px,transparent_10px)] opacity-70" />
            <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden md:grid-cols-[188px_minmax(0,1fr)]">
              <Sidebar />
              <section className="theme-scrollbar min-h-0 overflow-y-scroll overflow-x-hidden bg-[#ffe6f0] px-7 py-6 sm:px-8">
                {activeTab === "inicio" && <HomePanel />}
                {activeTab === "precios" && <PricesPanel />}
                {activeTab === "galeria" && <GalleryPanel />}
                {activeTab === "ocs" && <OcsPanel />}
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function CursorEffects() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const lastTrailRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const layer = layerRef.current;

    if (!cursor || !layer) {
      return undefined;
    }

    const spawnParticle = (x: number, y: number, variant: "burst" | "trail") => {
      const particle = document.createElement("span");
      const symbols = variant === "burst" ? ["✦", "✧", "♡", "✩"] : ["✦", "·", "✧"];
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      const angle = Math.random() * Math.PI * 2;
      const distance = variant === "burst" ? 18 + Math.random() * 34 : 8 + Math.random() * 20;
      const size = variant === "burst" ? 11 + Math.random() * 9 : 7 + Math.random() * 7;

      particle.textContent = symbol;
      particle.className = `cursor-particle cursor-particle-${variant}`;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.fontSize = `${size}px`;
      particle.style.setProperty("--tx", `${Math.cos(angle) * distance}px`);
      particle.style.setProperty("--ty", `${Math.sin(angle) * distance}px`);
      particle.style.setProperty("--rot", `${Math.random() * 180 - 90}deg`);

      layer.appendChild(particle);
      window.setTimeout(() => particle.remove(), variant === "burst" ? 720 : 520);
    };

    const burst = (x: number, y: number) => {
      for (let index = 0; index < 10; index += 1) {
        spawnParticle(x, y, "burst");
      }
    };

    const moveCursor = (event: PointerEvent) => {
      const x = event.clientX;
      const y = event.clientY;

      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      if (!isDraggingRef.current) {
        return;
      }

      const dx = x - lastTrailRef.current.x;
      const dy = y - lastTrailRef.current.y;
      const distance = Math.hypot(dx, dy);

      if (distance >= 12) {
        lastTrailRef.current = { x, y };
        spawnParticle(x, y, "trail");
      }
    };

    const pointerDown = (event: PointerEvent) => {
      isDraggingRef.current = true;
      lastTrailRef.current = { x: event.clientX, y: event.clientY };
      cursor.classList.add("is-clicking");
      burst(event.clientX, event.clientY);
    };

    const pointerUp = () => {
      isDraggingRef.current = false;
      cursor.classList.remove("is-clicking");
    };

    const pointerLeave = () => {
      isDraggingRef.current = false;
      cursor.classList.remove("is-clicking");
      cursor.classList.add("is-hidden");
    };

    const pointerEnter = () => {
      cursor.classList.remove("is-hidden");
    };

    window.addEventListener("pointermove", moveCursor);
    window.addEventListener("pointerdown", pointerDown);
    window.addEventListener("pointerup", pointerUp);
    window.addEventListener("pointercancel", pointerUp);
    document.documentElement.addEventListener("pointerleave", pointerLeave);
    document.documentElement.addEventListener("pointerenter", pointerEnter);

    return () => {
      window.removeEventListener("pointermove", moveCursor);
      window.removeEventListener("pointerdown", pointerDown);
      window.removeEventListener("pointerup", pointerUp);
      window.removeEventListener("pointercancel", pointerUp);
      document.documentElement.removeEventListener("pointerleave", pointerLeave);
      document.documentElement.removeEventListener("pointerenter", pointerEnter);
    };
  }, []);

  return (
    <>
      <div ref={layerRef} className="cursor-effects-layer" aria-hidden="true" />
      <div ref={cursorRef} className="soft-cursor" aria-hidden="true" />
    </>
  );
}

function WindowChrome({
  activeTab,
  onTabChange,
}: {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}) {
  return (
    <header className="flex h-[58px] shrink-0 items-end border-b border-[#c06080] bg-[#150008] px-4 pt-2">
      <div className="min-w-0 flex-1 overflow-hidden">
        <nav
          aria-label="Secciones"
          className="flex h-[42px] min-w-0 items-end overflow-x-auto overflow-y-hidden pl-1 pr-3 [scrollbar-width:thin]"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={[
                  "relative z-[1] -ml-px h-[35px] min-w-[112px] shrink-0 rounded-t-[14px] border border-b-0 px-4 pb-2 pt-1.5 text-sm text-[#f2c4d4] transition-all duration-200 first:ml-0",
                  "border-[#c06080] bg-[linear-gradient(180deg,#2a0018_0%,#17000b_100%)] shadow-[inset_0_1px_0_rgba(255,208,224,0.14)]",
                  "hover:border-[#e080a0] hover:bg-[linear-gradient(180deg,#6e1040_0%,#4a0030_100%)] hover:text-[#ffd0e0]",
                  isActive
                    ? "z-[3] h-[39px] border-[#e080a0] bg-[linear-gradient(180deg,#7a1848_0%,#58003a_100%)] pb-2.5 text-[#ffd0e0] shadow-[0_-2px_6px_rgba(200,80,120,0.25)] after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-[#58003a]"
                    : "after:absolute after:inset-x-2 after:bottom-0 after:h-px after:bg-[#4a1028]",
                ].join(" ")}
              >
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 shrink-0">{tab.icon}</span>
                  <span>{tab.label}</span>
                </span>
              </button>
            );
          })}
        </nav>
      </div>
      <WindowControls />
    </header>
  );
}

function WindowControls() {
  const controls = [
    { label: "minimizar", icon: <MinusIcon />, close: false },
    { label: "maximizar", icon: <MaximizeIcon />, close: false },
    { label: "cerrar", icon: <CloseIcon />, close: true },
  ];

  return (
    <div className="mb-2.5 ml-3 flex shrink-0 items-center gap-1.5" aria-hidden="true">
      {controls.map((control) => (
        <button
          key={control.label}
          type="button"
          tabIndex={-1}
          className={[
            "grid h-[24px] w-[24px] cursor-default place-items-center rounded-[5px] border border-[#c06080]",
            "bg-[linear-gradient(180deg,#3d0025_0%,#2a0018_100%)] text-[#ddb5c4] transition-all duration-200",
            control.close
              ? "hover:border-[#ff4d7a] hover:bg-[#b5003a] hover:text-white"
              : "hover:border-[#e080a0] hover:bg-[linear-gradient(180deg,#6e1040_0%,#4a0030_100%)] hover:text-[#ffd0e0]",
          ].join(" ")}
        >
          {control.icon}
        </button>
      ))}
    </div>
  );
}

function HeroBanner() {
  const icons = ["🖊️", "🖌️", "✏️", "🎨", "🌸"];

  return (
    <section className="relative h-[210px] shrink-0 overflow-hidden border-b border-[#c06080] bg-[#2a0018] px-6 py-9 text-center text-[#ffd0e0] shadow-[inset_58px_0_58px_rgba(180,50,90,0.45),inset_-58px_0_58px_rgba(120,0,55,0.42)]">
      <span className="sparkle-star absolute left-[3.5%] top-[15%] text-base text-[#e8a0c0]">✦</span>
      <span className="sparkle-star absolute left-[9%] bottom-[29%] text-xl text-[#ffd0e0] [animation-delay:0.9s]">★</span>
      <span className="sparkle-star absolute left-[23%] top-[23%] text-xs text-[#e080a0] [animation-delay:0.45s]">✧</span>
      <span className="sparkle-star absolute right-[15.5%] bottom-[22%] text-lg text-[#e080a0] [animation-delay:1.25s]">✦</span>
      <span className="sparkle-star absolute right-[4%] top-[24%] text-sm text-[#f2c4d4] [animation-delay:1.65s]">✧</span>
      <div className="absolute left-[14%] top-10 text-xl text-[#e8a0c0]">✦</div>
      <div className="absolute right-[16%] top-8 text-sm text-[#e080a0]">✧</div>
      <div className="absolute bottom-11 left-[24%] text-xl text-[#ffd0e0]">★</div>
      <div className="absolute bottom-8 right-[28%] text-lg text-[#e080a0]">✦</div>

      <div className="relative mx-auto flex max-w-[590px] items-center justify-center gap-4 sm:gap-5">
        {icons.map((icon, index) => (
          <div
            key={`${icon}-${index}`}
            className={[
              "grid place-items-center rounded-full border-2 border-[#e080a0] bg-[rgba(31,0,14,0.55)] text-2xl shadow-[0_0_18px_rgba(224,128,160,0.25)]",
              index === 2 ? "h-[112px] w-[112px] text-5xl" : "h-[74px] w-[74px]",
              index === 0 || index === 4 ? "hidden sm:grid" : "grid",
            ].join(" ")}
          >
            {icon}
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm italic text-[#ffd0e0]">banner ♡</p>
    </section>
  );
}

function Sidebar() {
  return (
    <aside className="min-h-0 border-r border-[#c06080] bg-[#1f000e] px-5 py-6 text-[#f2c4d4]">
      <div className="flex flex-col items-center text-center">
        <div className="relative h-[90px] w-[90px] overflow-hidden rounded-full border-4 border-[#e080a0] bg-[#f9d0e0] shadow-[0_0_0_5px_rgba(80,0,40,0.7)]">
          <img
            src={avatarImage}
            alt="_frgttn avatar"
            draggable={false}
            onContextMenu={(event) => event.preventDefault()}
            className="h-full w-full select-none object-cover"
          />
        </div>
        <h1 className="mt-4 border-b border-[#ffd0e0] px-3 pb-1 text-xl font-bold text-[#ffd0e0]">_frgttn</h1>
        <p className="mt-2 text-sm italic">dibujante / artista</p>
        <div className="my-4 h-px w-full bg-[#5a1835]" />
        <p className="mb-4 text-xs tracking-[0.45em] text-[#e080a0]">✦✦✦</p>
      </div>

      <div className="space-y-2">
        {links.map((link) => {
          const content = (
            <>
              <span className="underline underline-offset-2">{link.label}</span>
              <span className="text-[#e080a0]">{link.icon}</span>
            </>
          );

          return link.href ? (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between border-b border-dotted border-[#5a1835] py-1 text-sm transition-colors hover:text-[#ffd0e0]"
            >
              {content}
            </a>
          ) : (
            <div
              key={link.label}
              className="flex items-center justify-between border-b border-dotted border-[#5a1835] py-1 text-sm"
            >
              {content}
            </div>
          );
        })}
      </div>
    </aside>
  );
}

function HomePanel() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-4xl italic leading-tight text-[#4b1830] sm:text-5xl">¡Bienvenid@!</h2>
        <p className="mt-4 max-w-[680px] text-sm leading-6 text-[#5a3040]">
          dibujo fanart, OCs y comisiones. si algo te gusta o queres encargar algo,{" "}
          <a
            className="font-semibold underline decoration-[#8a1040] underline-offset-2"
            href="https://www.instagram.com/_frgttn"
          >
            escribime por DM
          </a>{" "}
          ♡
        </p>
      </div>

      <div className="text-[#c06080]">✦ 𓆩♡𓆪 ✦</div>

      <div className="grid gap-4 md:grid-cols-3">
        <InfoBlock title="Sobre mi">
          dibujo principalmente anime y personajes propios. llevo varios anos en esto y sigo aprendiendo 🌸
        </InfoBlock>
        <InfoBlock title="Estilos">
          <div className="flex flex-wrap gap-2">
            {artStyles.map((style) => (
              <span
                key={style}
                className="rounded-full border border-[#e090b8] bg-[#f9d0e0] px-3 py-1 text-xs text-[#8a1040]"
              >
                {style}
              </span>
            ))}
          </div>
        </InfoBlock>
        <InfoBlock title="Comisiones">abiertas ✦ revisa precios o escribime directo 🌸</InfoBlock>
      </div>
    </div>
  );
}

function PricesPanel() {
  return (
    <div>
      <PanelTitle title="Precios" subtitle="base por personaje, ajustes segun complejidad" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {prices.map((price) => (
          <article key={price.tier} className="rounded-lg border border-[#e090b8] bg-[#ffd0e0] p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-bold text-[#4b1830]">{price.tier}</h3>
              <span className="rounded-full bg-[#8a1040] px-3 py-1 text-sm font-bold text-[#ffd0e0]">
                {price.amount}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-[#5a3040]">{price.desc}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function GalleryPanel() {
  return (
    <div>
      <PanelTitle title="Galería" subtitle="muestras recientes y referencias de estilo" />
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {galleryItems.map((item) => (
          <figure
            key={item.src}
            className="mb-4 break-inside-avoid overflow-hidden rounded-lg border border-[#e090b8] bg-[#f9d0e0]"
          >
            <img
              src={item.src}
              alt={item.label}
              draggable={false}
              onContextMenu={(event) => event.preventDefault()}
              className="block h-auto w-full select-none"
            />
          </figure>
        ))}
      </div>
    </div>
  );
}

function OcsPanel() {
  return (
    <div>
      <PanelTitle title="Personajes originales" subtitle="pequenas fichas de OCs" />
      <div className="grid gap-3 sm:grid-cols-2">
        {ocs.map((oc) => (
          <article key={oc.name} className="flex gap-3 rounded-lg border border-[#e090b8] bg-[#ffd0e0] p-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-[#e090b8] bg-[#f9d0e0] text-xl">
              {oc.emoji}
            </div>
            <div>
              <h3 className="text-base font-bold text-[#4b1830]">{oc.name}</h3>
              <p className="text-xs italic text-[#8a1040]">{oc.pronouns}</p>
              <p className="mt-1.5 text-sm leading-5 text-[#5a3040]">{oc.desc}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {oc.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#e090b8] bg-[#ffe6f0] px-2.5 py-0.5 text-xs text-[#8a1040]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function InfoBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h3 className="rounded-full bg-[#c06080] px-5 py-2 text-center text-sm font-bold text-[#ffd0e0] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]">
        {title}
      </h3>
      <div className="mt-3 text-sm leading-6 text-[#5a3040]">{children}</div>
    </section>
  );
}

function PanelTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-3xl italic text-[#4b1830]">{title}</h2>
      <p className="mt-1 text-sm text-[#7a4058]">{subtitle}</p>
    </div>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full drop-shadow-[0_0_3px_rgba(255,208,224,0.45)]" aria-hidden="true">
      <path fill="#ffd0e0" d="M12 3a9 9 0 0 0 0 18h1.2a2.2 2.2 0 0 0 1.6-3.7 1.7 1.7 0 0 1 1.2-2.9h1.1A4.9 4.9 0 0 0 22 9.5C22 5.9 17.5 3 12 3Z" />
      <path fill="#e080a0" d="M12 3a9 9 0 0 0-8.7 6.7c2.4-1.9 5.7-3 9.6-3 3.4 0 6.4.8 8.5 2.3C20.9 5.6 16.8 3 12 3Z" opacity=".55" />
      <circle cx="7.5" cy="10" r="1.35" fill="#8bd3ff" />
      <circle cx="10.2" cy="7.4" r="1.25" fill="#f7df72" />
      <circle cx="14.1" cy="7.8" r="1.25" fill="#ff7aa8" />
      <circle cx="16.7" cy="10.7" r="1.25" fill="#9be28f" />
      <circle cx="14.4" cy="16.5" r="1.05" fill="#7a1848" opacity=".7" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full drop-shadow-[0_0_3px_rgba(255,208,224,0.45)]" aria-hidden="true">
      <path fill="#ff9f6e" d="M20.7 13.2 13.2 20.7a2 2 0 0 1-2.8 0L3 13.3V4h9.3l8.4 8.4a2 2 0 0 1 0 2.8Z" />
      <path fill="#ffd0e0" d="M3 4h9.3l2.8 2.8L7.7 14.2 3 9.5V4Z" opacity=".42" />
      <circle cx="7.4" cy="7.4" r="1.7" fill="#7a1848" />
      <path fill="#fff2f7" d="M12.5 17.7 18 12.2l1.1 1.1-5.5 5.5a.8.8 0 0 1-1.1-1.1Z" opacity=".65" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full drop-shadow-[0_0_3px_rgba(255,208,224,0.45)]" aria-hidden="true">
      <rect width="18" height="14" x="3" y="5" rx="2.4" fill="#ffd0e0" />
      <path fill="#7a1848" d="M5 17.5 9 12l3.1 3.5 2.1-2.5L21 19H5.8a.8.8 0 0 1-.8-.8v-.7Z" />
      <path fill="#ff7aa8" d="m12.1 15.5 2.1-2.5L21 19h-7.8l-2.4-2.7 1.3-.8Z" />
      <circle cx="15.5" cy="9.2" r="1.8" fill="#f7df72" />
      <path fill="#fff2f7" d="M5.8 6.5h12.4a1.3 1.3 0 0 1 1.3 1.3v.4H4.5v-.4a1.3 1.3 0 0 1 1.3-1.3Z" opacity=".5" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full drop-shadow-[0_0_3px_rgba(255,208,224,0.45)]" aria-hidden="true">
      <circle cx="9" cy="8" r="4" fill="#ffd0e0" />
      <circle cx="16.5" cy="8.8" r="3.2" fill="#e080a0" />
      <path fill="#7a1848" d="M2.5 21v-1.2A5.8 5.8 0 0 1 8.3 14h1.4a5.8 5.8 0 0 1 5.8 5.8V21h-13Z" />
      <path fill="#c06080" d="M13.4 21v-.8a5.5 5.5 0 0 0-1.5-3.8 5.2 5.2 0 0 1 3.8-1.6h1.2A5.1 5.1 0 0 1 22 19.9V21h-8.6Z" />
      <path fill="#fff2f7" d="M6.6 6.5c.9-1.3 2.7-1.9 4.3-1.3-.8.9-2.5 1.5-4.3 1.3Z" opacity=".72" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-2.4a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="m13.9 10.6 6.77-7.86h-1.6l-5.88 6.83-4.7-6.83H3.07l7.1 10.34-7.1 8.18h1.6l6.4-7.21 5.1 7.21h5.42l-7.69-10.66Zm-2.26 2.62-.74-1.05L5.19 4h2.53l4.63 6.63.74 1.05 5.98 8.54h-2.53l-4.9-7Z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A5.98 5.98 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4" aria-hidden="true">
      <path d="M5 12h14" />
    </svg>
  );
}

function MaximizeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <path d="M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4" />
      <rect width="10" height="7" x="12" y="13" rx="2" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4" aria-hidden="true">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
