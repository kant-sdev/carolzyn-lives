import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { TwitchFollower, TwitchStream } from "@/lib/twitch";
import { useFollowers, useStreamStatus } from "@/hooks/use-twitch";
import { Skeleton } from "@/components/ui/skeleton";

interface RecentFollowersProps {
  limit?: number;
}

function RecentFollowersSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-4 bg-muted/30 rounded-2xl">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-3 w-24 mb-2" />
            <Skeleton className="h-2 w-32" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function RecentFollowers({ limit = 10 }: RecentFollowersProps) {
  const [mounted, setMounted] = useState(false);

  const {
    data: followersData,
    isLoading: followersLoading,
    isError: followersError,
  } = useFollowers(limit);

  const {
    data: streamData,
    isLoading: streamLoading,
    isError: streamError,
  } = useStreamStatus();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLoading = followersLoading && streamLoading;
  const followers = followersData ?? [];
  const stream = streamData ?? {
    online: false,
    viewer_count: 0,
    title: "",
    thumbnail_url: "",
    game_name: "",
  };
  const isOnline = stream.online;

  if (!mounted || isLoading) {
    return <RecentFollowersSkeleton />;
  }

  const viewerCountText = isOnline
    ? ` • ${stream.viewer_count} filhotes na live agora ☕`
    : "";

  return (
    <div className="space-y-6">
      {/* Live status + viewer count */}
      {viewerCountText && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="p-4 rounded-2xl bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20"
        >
          <div className="flex items-center gap-2 text-sm font-medium text-red-600 dark:text-red-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-pulse" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            {stream.viewer_count} filhotes na live agora ☕
          </div>
        </motion.div>
      )}

      {/* Followers list */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Novos filhotes 🐾
        </h3>
        {followers.length > 0 ? (
          <div className="grid gap-3">
            {followers.map((follower, i) => {
              const colors = [
                "bg-warm-orange text-cream",
                "bg-sage text-cream",
                "bg-coffee text-cream",
                "bg-warm-orange/80 text-cream",
              ];
              const colorClass = colors[i % colors.length];

              const initial = follower.user_name.charAt(0).toUpperCase();
              const initials =
                follower.user_name.split("_").length > 1
                  ? follower.user_name
                      .split("_")
                      .map((p) => p.charAt(0))
                      .join("")
                      .toUpperCase()
                  : initial;

              return (
                <motion.div
                  key={follower.user_id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-center gap-3 p-3 rounded-2xl hover:bg-muted/40 transition-colors"
                >
                  <div
                    className={`size-12 rounded-full ${colorClass} flex items-center justify-center font-semibold text-xs flex-shrink-0`}
                  >
                    {initials.length <= 2 ? initials : initial}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{follower.user_name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                      Filhote novo 🐾
                    </p>
                  </div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.05 + 0.1, type: "spring" }}
                    className="text-xs font-semibold px-2 py-1 rounded-full bg-warm-orange/15 text-warm-orange"
                  >
                    Novo!
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">Nenhum novo filhote por enquanto... 🐾</p>
            {(followersError || streamError) && (
              <p className="text-xs text-muted-foreground/70 mt-2">
                Não foi possível atualizar os filhotes no momento. Tente novamente em breve.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Footer com atualização */}
      <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border/30">
        <span className="flex items-center justify-center gap-1">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-sage opacity-75 animate-pulse" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-sage" />
          </span>
          Atualiza a cada minuto
        </span>
      </div>
    </div>
  );
}
