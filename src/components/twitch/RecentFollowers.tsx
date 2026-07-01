import { motion } from "framer-motion";
import type { TwitchFollower } from "@/lib/twitch";
import { useFollowers } from "@/hooks/use-twitch";
import { Skeleton } from "@/components/ui/skeleton";

interface RecentFollowersProps {
  limit?: number;
}

function RecentFollowersSkeleton() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-4 rounded-3xl bg-muted/30 border border-border/50 min-h-[96px]"
        >
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      ))}
    </div>
  );
}

function formatRelativeTime(dateString: string) {
  const date = new Date(dateString);
  const diffMinutes = Math.round((Date.now() - date.getTime()) / 60000);

  if (diffMinutes <= 0) {
    return "agora";
  }

  if (diffMinutes === 1) {
    return "1 min";
  }

  if (diffMinutes < 60) {
    return `${diffMinutes} min`;
  }

  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours === 1) {
    return "1 h";
  }

  if (diffHours < 24) {
    return `${diffHours} h`;
  }

  const diffDays = Math.round(diffHours / 24);
  if (diffDays === 1) {
    return "ontem";
  }

  return `${diffDays} dias`;
}

function formatUpdatedAt(dataUpdatedAt: number | undefined) {
  if (!dataUpdatedAt) {
    return null;
  }

  const diffMinutes = Math.round((Date.now() - dataUpdatedAt) / 60000);
  if (diffMinutes <= 0) return "agora";
  if (diffMinutes === 1) return "1 min";
  return `${diffMinutes} min`;
}

export function RecentFollowers({ limit = 10 }: RecentFollowersProps) {
  const {
    data: followersData,
    isLoading: followersLoading,
    isError: followersError,
    isFetching,
    dataUpdatedAt,
    refetch,
  } = useFollowers(limit);

  const followers = followersData?.followers ?? [];
  const lastUpdatedLabel = formatUpdatedAt(dataUpdatedAt);
  const hasCachedData = followers.length > 0;
  const showFallback = followersError && !hasCachedData;

  const headerDescription = followersLoading
    ? "Enquanto a conexão acorda, a toca se prepara." 
    : followersError
    ? "Os dados voltam em breve — cache de até 30 min."
    : "Pessoas que decidiram fazer parte da toca recentemente.";

  return (
    <div className="space-y-6 min-h-[420px]">
      <div className="space-y-3">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Últimos filhotes que chegaram 🐾
          </h3>
          <p className="text-sm text-muted-foreground">{headerDescription}</p>
        </div>

        {followersLoading ? (
          <RecentFollowersSkeleton />
        ) : hasCachedData ? (
          <div className="grid gap-3 sm:grid-cols-2">
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
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="flex items-center gap-4 p-4 rounded-3xl bg-card/80 border border-border/50 hover:bg-warm-orange/10 transition-colors"
                >
                  <div className={`size-12 rounded-full ${colorClass} flex items-center justify-center font-semibold text-sm`}>
                    {initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{follower.user_name}</p>
                    <p className="text-xs text-muted-foreground">{formatRelativeTime(follower.followed_at)}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : showFallback ? (
          <div className="grid gap-3">
            <div className="rounded-3xl border border-warm-orange/20 bg-warm-orange/10 p-6 min-h-[180px] flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-warm-orange/80">
                  Twitch deu uma pausinha ☕
                </p>
                <h4 className="mt-3 text-lg font-semibold text-foreground">
                  A toca segue acolhedora, mesmo sem resposta da Twitch.
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Os dados voltam em breve. Enquanto isso, o espaço fica preenchido com o clima da toca e um convite para tentar de novo.
                </p>
              </div>

              <button
                type="button"
                onClick={() => refetch()}
                disabled={isFetching}
                className="inline-flex items-center justify-center rounded-full bg-warm-orange px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:shadow-lg transition-all disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isFetching ? "Atualizando..." : "tentar de novo"}
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  title: "A toca está quentinha",
                  description: "Mesmo sem Twitch, a comunidade segue acolhida e cheia de boas-vindas.",
                },
                {
                  title: "Hora do café",
                  description: "A Twitch tem seu momento de descanso. Logo os filhotes voltam a chegar.",
                },
                {
                  title: "Cache amigo",
                  description: "Se já houveram dados, eles permanecem acessíveis por até 30 minutos.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-3xl border border-border/40 bg-card/70 p-4 min-h-[96px]">
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-border/50 bg-muted/40 p-6 min-h-[180px] flex items-center justify-center text-center">
            <div>
              <p className="text-sm font-semibold text-foreground">A toca está calma por enquanto.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Logo chegam mais filhotes para preencher esse cantinho.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border/30">
        {followersError && hasCachedData
          ? `Usando últimos dados válidos${lastUpdatedLabel ? ` — atualizados há ${lastUpdatedLabel}` : ``}.`
          : lastUpdatedLabel
          ? `Dados atualizados há ${lastUpdatedLabel}. Cache de até 30 min.`
          : "Dados atualizados com até 30 minutos de cache."}
      </div>
    </div>
  );
}
