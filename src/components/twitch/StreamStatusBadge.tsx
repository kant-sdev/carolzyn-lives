import { useEffect, useState } from "react";
import type { TwitchStream } from "@/lib/twitch";
import { useStreamStatus } from "@/hooks/use-twitch";

interface StreamStatusBadgeProps {
  showViewerCount?: boolean;
  showTitle?: boolean;
}

function StreamStatusBadgeSkeleton() {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted rounded-full text-xs font-medium mb-6 ring-1 ring-border/40">
      <div className="h-2 w-2 bg-muted-foreground/40 rounded-full" />
      <div className="h-3 w-24 bg-muted-foreground/20 rounded animate-pulse" />
    </div>
  );
}

export function StreamStatusBadge({
  showViewerCount = true,
  showTitle = false,
}: StreamStatusBadgeProps) {
  const [mounted, setMounted] = useState(false);

  const { data, isLoading, error } = useStreamStatus();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return <StreamStatusBadgeSkeleton />;
  }

  if (error || !data) {
    // Fallback para offline em caso de erro ou dados faltando
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-sage/15 text-sage rounded-full text-xs font-medium mb-6 ring-1 ring-sage/30">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-sage opacity-75 animate-pulse" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-sage" />
        </span>
        🌙 Próxima live em breve
      </div>
    );
  }

  const streamStatus = data;
  const isOnline = streamStatus.online;

  if (isOnline) {
    const viewerCountText =
      showViewerCount && data.viewer_count > 0
        ? `🔴 ${new Intl.NumberFormat("pt-BR").format(data.viewer_count)} filhotes assistindo agora`
        : "🔴 Carol está ao vivo agora";

    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/15 text-red-600 dark:text-red-400 rounded-full text-xs font-medium mb-6 ring-1 ring-red-500/30">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-pulse" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
        </span>
        <span className="truncate">{viewerCountText}</span>
      </div>
    );
  }

  // Estado OFFLINE
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-sage/15 text-sage rounded-full text-xs font-medium mb-6 ring-1 ring-sage/30">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-sage opacity-75 animate-pulse" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-sage" />
      </span>
      🌙 Próxima live em breve
    </div>
  );
}
