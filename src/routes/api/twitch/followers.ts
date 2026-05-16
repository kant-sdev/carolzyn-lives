import { getRecentFollowers } from "@/lib/twitch";
import type { TwitchFollower } from "@/lib/twitch";

interface FollowersResponse {
  followers: TwitchFollower[];
  count: number;
  timestamp: string;
}

export async function GET(): Promise<Response> {
  try {
    const userLogin = process.env.TWITCH_USERNAME || process.env.TWITCH_USER_LOGIN || "carolzyn";
    const limit = 10; // Retorna apenas 10 seguidores mais recentes

    const followers = await getRecentFollowers(userLogin, limit);

    const response: FollowersResponse = {
      followers,
      count: followers.length,
      timestamp: new Date().toISOString(),
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60, s-maxage=60", // Cache 1 minuto
      },
    });
  } catch (error) {
    console.error("[API] Erro ao buscar seguidores:", error);

    const fallbackResponse: FollowersResponse = {
      followers: [],
      count: 0,
      timestamp: new Date().toISOString(),
    };

    return new Response(JSON.stringify(fallbackResponse), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60, s-maxage=60",
      },
    });
  }
}
