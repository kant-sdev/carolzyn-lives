import { getStream } from "@/lib/twitch";
import type { TwitchStream } from "@/lib/twitch";

export async function GET(): Promise<Response> {
  try {
    const userLogin = process.env.TWITCH_USERNAME || process.env.TWITCH_USER_LOGIN || "carolzyn";

    const streamData = await getStream(userLogin);

    return new Response(JSON.stringify(streamData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=30, s-maxage=30", // Cache 30 segundos
      },
    });
  } catch (error) {
    console.error("[API] Erro ao buscar status da stream:", error);

    // Retorna offline como fallback em caso de erro
    const fallbackStream: TwitchStream = {
      online: false,
      viewer_count: 0,
      title: "",
      thumbnail_url: "",
      game_name: "",
    };

    return new Response(JSON.stringify(fallbackStream), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=30, s-maxage=30",
      },
    });
  }
}
