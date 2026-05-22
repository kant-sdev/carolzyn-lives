import { useQuery } from "@tanstack/react-query";
import type { TwitchFollower, TwitchFollowerStats, TwitchStream, TwitchUser } from "@/lib/twitch";

type TwitchStreamResponse = TwitchStream & {
  isLive?: boolean;
  stream?: unknown;
};

const API_PATHS = {
  stream: "/api/twitch/stream",
  followers: "/api/twitch/followers",
  user: "/api/twitch/user",
};

async function fetchStream(): Promise<TwitchStream> {
  const response = await fetch(API_PATHS.stream);
  if (!response.ok) {
    throw new Error("Falha ao buscar status da stream");
  }
  return response.json();
}

async function fetchFollowers(limit: number): Promise<TwitchFollowerStats> {
  const response = await fetch(API_PATHS.followers);
  if (!response.ok) {
    throw new Error("Falha ao buscar seguidores");
  }

  const data = (await response.json()) as TwitchFollowerStats;
  return {
    totalFollowers: data.totalFollowers,
    followers: data.followers.slice(0, limit),
  };
}

async function fetchUser(): Promise<TwitchUser> {
  const response = await fetch(API_PATHS.user);
  if (!response.ok) {
    throw new Error("Falha ao buscar dados do usuário Twitch");
  }
  return response.json();
}

export function useStreamStatus() {
  const query = useQuery<TwitchStreamResponse, Error>({
    queryKey: ["twitch-stream"],
    queryFn: fetchStream,
    // Cache local por 30 minutos para manter a integração suave
    refetchInterval: 30 * 60 * 1000,
    refetchOnWindowFocus: true,
    staleTime: 30 * 60 * 1000,
    retry: 1,
  });

  return {
    ...query,
    isLive: query.data?.isLive ?? query.data?.online ?? false,
  };
}

export function useFollowers(limit: number = 10) {
  return useQuery<TwitchFollowerStats, Error>({
    queryKey: ["twitch-followers", limit],
    queryFn: () => fetchFollowers(limit),
    refetchInterval: 15 * 60 * 1000,
    refetchOnWindowFocus: false,
    staleTime: 15 * 60 * 1000,
    retry: 1,
  });
}

export function useTwitchUser() {
  return useQuery({
    queryKey: ["twitch-user"],
    queryFn: fetchUser,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}
