import { motion } from "framer-motion";
import type { TwitchFollower } from "@/lib/twitch";
import { useFollowers } from "@/hooks/use-twitch";
import { Skeleton } from "@/components/ui/skeleton";

interface RecentFollowersProps {
  limit?: number;
}

function RecentFollowersSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 bg-muted/30 rounded-3xl">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-40" />
          </div>
        </div>
      ))}
    </div>
  );
}

function formatFollowerDate(dateString: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
}

export function RecentFollowers({ limit = 10 }: RecentFollowersProps) {
  const {
    data: followersData,
    isLoading: followersLoading,
    isError: followersError,
  } = useFollowers(limit);

  const followers = followersData?.followers ?? [];

  if (followersLoading) {
    return <RecentFollowersSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Últimos filhotes que chegaram 🐾
          </h3>
          <p className="text-sm text-muted-foreground">
            Pessoas que decidiram fazer parte do ninho recentemente.
          </p>
        </div>

        {followers.length > 0 ? (
          <div className="grid gap-3">
            {followers.map((follower, i) => {
              const colors = [
                "bg-warm-orange/15 text-warm-orange",
                "bg-sage/15 text-sage",
                "bg-coffee/15 text-coffee",
                "bg-warm-orange/25 text-warm-orange",
              ];
              const colorClass = colors[i % colors.length];

              const initials = follower.user_name
                .split(/[^A-Za-z0-9]+/)
                .filter(Boolean)
                .slice(0, 2)
                .map((part) => part.charAt(0).toUpperCase())
                .join("") || follower.user_name.charAt(0).toUpperCase();

              return (
                <motion.div
                  key={follower.user_id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-center gap-4 p-4 rounded-3xl bg-card/70 border border-border/50"
                >
                  <div className={`size-12 rounded-full ${colorClass} flex items-center justify-center font-semibold text-sm`}>
                    {initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{follower.user_name}</p>
                    <p className="text-xs text-muted-foreground">{formatFollowerDate(follower.followed_at)}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-border/50 bg-muted/40 p-8 text-center text-sm text-muted-foreground">
            {followersError ? (
              <>
                <p className="font-semibold text-foreground">Não foi possível carregar os últimos filhotes.</p>
                <p className="mt-2">Tente novamente em alguns minutos.</p>
              </>
            ) : (
              <p>O ninho está calmo por enquanto. Logo chegam mais filhotes.</p>
            )}
          </div>
        )}
      </div>

      <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border/30">
        Dados atualizados com até 30 minutos de cache.
      </div>
    </div>
  );
}
