type NetlifyHandler = (event: any, context: any) => Promise<any>;

const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const ACCESS_TOKEN = process.env.TWITCH_ACCESS_TOKEN;
const USERNAME = process.env.TWITCH_USERNAME;

export const handler: NetlifyHandler = async (event, context) => {
  if (!CLIENT_ID || !ACCESS_TOKEN || !USERNAME) {
    return {
      statusCode: 500,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "Missing Twitch environment variables" }),
    };
  }

  const url = `https://api.twitch.tv/helix/streams?user_login=${encodeURIComponent(
    USERNAME
  )}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Client-ID": CLIENT_ID,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      return {
        statusCode: res.status || 502,
        headers: {
          "Cache-Control": "no-store",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ error: `Twitch API error: ${text}` }),
      };
    }

    const data = await res.json();
    const stream = Array.isArray(data.data) && data.data.length > 0 ? data.data[0] : null;
    const isLive = !!stream;

    const legacy = stream
      ? {
          online: true,
          viewer_count: stream.viewer_count ?? 0,
          title: stream.title ?? "",
          thumbnail_url: stream.thumbnail_url ?? "",
          game_name: stream.game_name ?? "",
        }
      : {
          online: false,
          viewer_count: 0,
          title: "",
          thumbnail_url: "",
          game_name: "",
        };

    return {
      statusCode: 200,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isLive, stream, ...legacy }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: err?.message ?? String(err) }),
    };
  }
};
