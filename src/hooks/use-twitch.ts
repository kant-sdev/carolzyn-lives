import { useQuery } from "@tanstack/react-query";
import type { TwitchFollower, TwitchStream, TwitchUser } from "@/lib/twitch";

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

async function fetchFollowers(limit: number): Promise<TwitchFollower[]> {
  const response = await fetch(API_PATHS.followers);
  if (!response.ok) {
    throw new Error("Falha ao buscar seguidores");
  }
  const data = (await response.json()) as { followers: TwitchFollower[] };
  return data.followers.slice(0, limit);
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
    refetchInterval: 30_000,
    refetchOnWindowFocus: false,
    staleTime: 25_000,
    retry: 1,
  });
}

export function useFollowers(limit: number = 10) {
  return useQuery({
    queryKey: ["twitch-followers", limit],
    queryFn: () => fetchFollowers(limit),
    refetchInterval: 60_000,
    refetchOnWindowFocus: false,
    staleTime: 55_000,
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
