import { PawIcon } from "@/components/cozy/PawIcon";

export function Footer() {
  return (
    <footer className="border-t border-border py-12 bg-background">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-5">
          <div className="size-8 bg-warm-orange/15 rounded-full flex items-center justify-center">
            <PawIcon className="text-warm-orange" size={14} />
          </div>
          <span className="font-serif text-lg tracking-tight">carolzyn</span>
        </div>
        <p className="text-sm text-muted-foreground mb-7 italic">
          Feito com café e oração para todos os filhotes.
        </p>
        <div className="flex justify-center gap-7 text-xs font-medium text-muted-foreground">
          <a href="https://twitch.tv" target="_blank" rel="noreferrer" className="hover:text-warm-orange transition-colors">Twitch</a>
          <a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-warm-orange transition-colors">Discord</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-warm-orange transition-colors">Instagram</a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-warm-orange transition-colors">YouTube</a>
        </div>
      </div>
    </footer>
  );
}