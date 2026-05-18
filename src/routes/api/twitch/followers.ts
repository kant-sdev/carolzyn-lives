import { getFollowers } from "@/lib/twitch";
import type { TwitchFollower, TwitchFollowerStats } from "@/lib/twitch";

interface FollowersResponse extends TwitchFollowerStats {
  timestamp: string;
}

export async function GET(): Promise<Response> {
  try {
    const userLogin = process.env.TWITCH_USERNAME || process.env.TWITCH_USER_LOGIN || "carolzyn";
    const limit = 10; // Retorna apenas 10 seguidores mais recentes

    const followersData = await getFollowers(userLogin, limit);

    const response: FollowersResponse = {
      ...followersData,
      timestamp: new Date().toISOString(),
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=1800, s-maxage=1800", // Cache 30 minutos
      },
    });
  } catch (error) {
    console.error("[API] Erro ao buscar seguidores:", error);

    const fallbackResponse: FollowersResponse = {
      totalFollowers: 0,
      followers: [],
      timestamp: new Date().toISOString(),
    };

    return new Response(JSON.stringify(fallbackResponse), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=1800, s-maxage=1800",
      },
    });
  }
}
