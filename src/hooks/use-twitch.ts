import { useQuery } from "@tanstack/react-query";
import type { TwitchFollower, TwitchFollowerStats, TwitchStream, TwitchUser } from "@/lib/twitch";

const API_PATHS = {
  stream: "/.netlify/functions/twitch-stream",
  followers: "/api/twitch/followers",
  user: "/api/twitch/user",
};

async function fetchStream(): Promise<TwitchStream> {
  const response = await fetch(API_PATHS.stream, { cache: "no-store" });
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
  return useQuery({
    queryKey: ["twitch-stream"],
    queryFn: fetchStream,
    // Atualiza automaticamente a cada 30 minutos e busca ao focar a janela
    refetchInterval: 30 * 60 * 1000,
    refetchOnWindowFocus: true,
    staleTime: 0,
    retry: 1,
  });
}

export function useFollowers(limit: number = 10) {
  return useQuery({
    queryKey: ["twitch-followers", limit],
    queryFn: () => fetchFollowers(limit),
    refetchInterval: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    staleTime: 30 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
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
