type NetlifyHandler = (event: any, context: any) => Promise<any>;

declare const process: {
  env: Record<string, string | undefined>;
};

type DailyVerse = {
  reference: string;
  text: string;
  book: string;
  chapter: number;
  verse: number;
  version: string;
};

const BIBLE_API_URL = "https://bibliaapi.com.br/api/v2/versions/ACF/random";
const DAILY_VERSE_CACHE_SECONDS = 12 * 60 * 60;

const FALLBACK_VERSE: DailyVerse = {
  reference: "João 3:16",
  text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo o que nele crê não pereça, mas tenha a vida eterna.",
  book: "João",
  chapter: 3,
  verse: 16,
  version: "ACF",
};

function jsonResponse(body: Record<string, unknown>, status: number) {
  return {
    statusCode: status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": `public, max-age=0, s-maxage=${DAILY_VERSE_CACHE_SECONDS}, stale-while-revalidate=60`,
    },
    body: JSON.stringify(body),
  };
}

function isDailyVerse(value: any): value is DailyVerse {
  return (
    value &&
    typeof value.reference === "string" &&
    typeof value.text === "string" &&
    typeof value.book === "string" &&
    typeof value.chapter === "number" &&
    typeof value.verse === "number" &&
    typeof value.version === "string"
  );
}

export const handler: NetlifyHandler = async () => {
  const token = process.env.BIBLIA_API_TOKEN;

  console.log("[devotional-verse] token present?", !!token);

  if (!token) {
    console.error("[devotional-verse] missing BIBLIA_API_TOKEN");
    return jsonResponse(FALLBACK_VERSE, 200);
  }

  try {
    const response = await fetch(BIBLE_API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("[devotional-verse] Biblia API status", response.status);

    const textBody = await response.text();
    let json: any;

    try {
      json = textBody ? JSON.parse(textBody) : null;
    } catch (parseError) {
      console.error("[devotional-verse] invalid JSON from Bible API", parseError, textBody);
      return jsonResponse(FALLBACK_VERSE, 200);
    }

    if (!response.ok) {
      console.error("[devotional-verse] Bible API returned error", response.status, textBody);
      return jsonResponse(FALLBACK_VERSE, 200);
    }

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
      console.error("[devotional-verse] invalid Bible API payload", json);
      return jsonResponse(FALLBACK_VERSE, 200);
    }

    const verse = {
      reference: data.reference,
      text: data.text.trim(),
      book: data.book.name,
      chapter: data.chapter,
      verse: data.verse,
      version: data.version,
    };

    return jsonResponse(verse, 200);
  } catch (error: any) {
    console.error("[devotional-verse] unexpected error", error?.message ?? error);
    return jsonResponse(FALLBACK_VERSE, 200);
  }
};
