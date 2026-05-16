import { getUser } from "@/lib/twitch";
import type { TwitchUser } from "@/lib/twitch";

export async function GET(): Promise<Response> {
  try {
    const userLogin = process.env.TWITCH_USERNAME || process.env.TWITCH_USER_LOGIN || "carolzyn";

    const userData = await getUser(userLogin);

    return new Response(JSON.stringify(userData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300, s-maxage=300",
      },
    });
  } catch (error) {
    console.error("[API] Erro ao buscar usuário Twitch:", error);

    const fallbackUser: Partial<TwitchUser> = {
      id: "",
      login: "carolzyn",
      display_name: "Carol",
      profile_image_url: "",
      description: "Acompanhe a Carol nas lives para um cantinho cozy e acolhedor.",
    };

    return new Response(JSON.stringify(fallbackUser), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300, s-maxage=300",
      },
    });
  }
}
