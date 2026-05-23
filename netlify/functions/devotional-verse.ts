type NetlifyHandler = (event: any, context: any) => Promise<any>;

const BIBLE_API_URL = "https://bibliaapi.com.br/api/v2/versions/ACF/random";

export const handler: NetlifyHandler = async () => {
  const token = process.env.BIBLIA_API_TOKEN;

  if (!token) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
      body: JSON.stringify({ error: "Missing Bíblia API token" }),
    };
  }

  try {
    const response = await fetch(BIBLE_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const body = await response.text();
      return {
        statusCode: 502,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
        body: JSON.stringify({ error: `Bíblia API error: ${body}` }),
      };
    }

    const json = await response.json();
    const data = json?.data;

    if (
      !data ||
      typeof data.reference !== "string" ||
      typeof data.text !== "string" ||
      typeof data.version !== "string" ||
      !data.book ||
      typeof data.book.name !== "string" ||
      typeof data.chapter !== "number" ||
      typeof data.verse !== "number"
    ) {
      return {
        statusCode: 502,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
        body: JSON.stringify({ error: "Invalid response from Bíblia API" }),
      };
    }

    const verse = {
      reference: data.reference,
      text: data.text.trim(),
      book: data.book.name,
      chapter: data.chapter,
      verse: data.verse,
      version: data.version,
    };

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=0, s-maxage=43200, stale-while-revalidate=60",
      },
      body: JSON.stringify(verse),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
      body: JSON.stringify({ error: error?.message ?? "Falha ao carregar o versículo do dia." }),
    };
  }
};
