import { useEffect, useState } from "react";
import type { TwitchStream } from "@/lib/twitch";
import { useStreamStatus } from "@/hooks/use-twitch";
import { Skeleton } from "@/components/ui/skeleton";

const TWITCH_URL = "https://twitch.tv/carolzyn";

interface TwitchLiveButtonProps {
  className?: string;
  showViewerCount?: boolean;
  showTitle?: boolean;
}

function TwitchLiveButtonSkeleton() {
  return (
    <div className="hidden sm:inline-flex items-center gap-2">
      <Skeleton className="h-10 w-28 rounded-full" />
    </div>
  );
}

export function TwitchLiveButton({
  className = "",
  showViewerCount = false,
  showTitle = false,
}: TwitchLiveButtonProps) {
  const [mounted, setMounted] = useState(false);

  const { data, isLoading, error } = useStreamStatus();

  // Evita hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return <TwitchLiveButtonSkeleton />;
  }

  // Fallback para erro
  if (error) {
    return (
      <a
        href={TWITCH_URL}
        target="_blank"
        rel="noreferrer"
        className={`hidden sm:inline-flex bg-foreground text-background px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-all items-center gap-2 ${className}`}
      >
        Entrar na Live
        <span className="size-1.5 bg-gray-400 rounded-full" />
      </a>
    );
  }

  if (!data) {
    return (
      <a
        href={TWITCH_URL}
        target="_blank"
        rel="noreferrer"
        className={`hidden sm:inline-flex bg-foreground text-background px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-all items-center gap-2 ${className}`}
      >
        Entrar na Live
        <span className="size-1.5 bg-gray-400 rounded-full" />
      </a>
    );
  }

  const isOnline = data.online;

  if (isOnline) {
    const viewerCountText = showViewerCount ? ` • ${data.viewer_count} ao vivo` : "";
    const titleText = showTitle && data.title ? ` • ${data.title.substring(0, 30)}...` : "";

    return (
      <a
        href={TWITCH_URL}
        target="_blank"
        rel="noreferrer"
        className={`hidden sm:inline-flex relative group items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${className}`}
      >
        {/* Glow background animado */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-red-400/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Background principal */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-red-500 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Conteúdo */}
        <div className="relative flex items-center gap-2 z-10">
          <span className="text-white">
            Ao Vivo
            {viewerCountText}
            {titleText}
          </span>

          {/* Ponto vermelho animado */}
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-pulse" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>

          {/* Tooltip com info */}
          {(showViewerCount || showTitle) && (
            <div className="hidden group-hover:block absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-50">
              {data.viewer_count} viewers
              {data.title && ` • ${data.title.substring(0, 25)}...`}
            </div>
          )}
        </div>

        {/* Border shimmer */}
        <div className="absolute inset-0 rounded-full border border-red-300 opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
      </a>
    );
  }

  // Estado OFFLINE
  return (
    <a
      href={TWITCH_URL}
      target="_blank"
      rel="noreferrer"
      className={`hidden sm:inline-flex opacity-70 hover:opacity-90 items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 ${className}`}
    >
      <span>Offline ☕</span>
      <span className="size-1.5 bg-gray-400 rounded-full" />
    </a>
  );
}
