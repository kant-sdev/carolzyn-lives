import { Link } from "@tanstack/react-router";
import { Instagram, Moon, Sun, Menu, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { PawIcon } from "@/components/cozy/PawIcon";
import { TwitchLiveButton } from "@/components/twitch/TwitchLiveButton";

const links = [
  { to: "/", label: "Início" },
  { to: "/filhotes", label: "Filhotes" },
  { to: "/devocional", label: "Devocional" },
  { to: "/cafe", label: "Café" },
] as const;

function TwitchIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
    </svg>
  );
}
function DiscordIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
    </svg>
  );
}

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="size-9 bg-warm-orange/15 rounded-full flex items-center justify-center ring-1 ring-warm-orange/30">
            <PawIcon className="text-warm-orange" size={18} />
          </div>
          <span className="font-serif text-xl tracking-tight">carolzyn</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-3 mr-1 border-r border-border pr-3 text-muted-foreground">
            <a
              href="https://twitch.tv/carolzyn"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitch"
              className="hover:text-warm-orange transition-colors"
            >
              <TwitchIcon className="size-4" />
            </a>
            <a
              href="https://discord.gg/7g9wqcKhb"
              target="_blank"
              rel="noreferrer"
              aria-label="Discord"
              className="hover:text-warm-orange transition-colors"
            >
              <DiscordIcon className="size-4" />
            </a>
            <a
              href="https://www.instagram.com/oicarolzyn/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hover:text-warm-orange transition-colors"
            >
              <Instagram className="size-4" />
            </a>
          </div>
          <button
            onClick={toggle}
            aria-label="Alternar tema"
            className="size-9 rounded-full hover:bg-muted transition-colors flex items-center justify-center text-muted-foreground"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <TwitchLiveButton />
          <button
            className="md:hidden size-9 rounded-full hover:bg-muted flex items-center justify-center"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
          <div className="px-6 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-2 text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="https://twitch.tv/carolzyn"
              target="_blank"
              rel="noreferrer"
              className="bg-foreground text-background px-5 py-2.5 rounded-full text-sm font-medium text-center"
            >
              Entrar na Live
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
