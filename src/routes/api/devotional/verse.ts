import { bibleApiResponseSchema, mapBibleApiResponse, DAILY_VERSE_CACHE_SECONDS } from "@/lib/bible";

const BIBLE_API_URL = "https://bibliaapi.com.br/api/v2/versions/ACF/random";

function jsonResponse(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": `public, max-age=0, s-maxage=${DAILY_VERSE_CACHE_SECONDS}, stale-while-revalidate=60`,
    },
  });
}

export async function GET(): Promise<Response> {
  const token = process.env.BIBLIA_API_TOKEN;

  if (!token) {
    return jsonResponse({ error: "Token da API da Bíblia ausente." }, 500);
  }

  try {
    const response = await fetch(BIBLE_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const body = await response.text();
      console.error("[API] Erro ao buscar versículo diário:", response.status, body);
      return jsonResponse({ error: "Não foi possível carregar o versículo do dia." }, 502);
    }

    const json = await response.json();
    const parsed = bibleApiResponseSchema.safeParse(json);

    if (!parsed.success) {
      console.error("[API] Resposta inválida da Bíblia:", parsed.error, json);
      return jsonResponse({ error: "Resposta inválida da API da Bíblia." }, 502);
    }

    const verse = mapBibleApiResponse(parsed.data);
    return jsonResponse(verse, 200);
  } catch (error) {
    console.error("[API] Erro ao buscar versículo diário:", error);
    return jsonResponse({ error: "Falha ao carregar o versículo do dia." }, 500);
  }
}
