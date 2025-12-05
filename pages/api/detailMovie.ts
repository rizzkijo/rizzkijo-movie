import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, debug } = req.query;
  const accessToken = (process.env.TMDB_ACCESS_TOKEN || "").trim();
  const apiKey = (process.env.TMDB_API_KEY || "").trim();

  const debugMode = debug === "true" || debug === "1";

  if (!accessToken && !apiKey) {
    // jika tidak ada credential sama sekali
    return res.status(500).json({ message: "Missing TMDB credentials on server" });
  }
  const url = `https://api.themoviedb.org/3/movie/${id}`;

  try {
    let response: Response;

    if (accessToken) {
      response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } else {
      // fallback to api key in query string
      response = await fetch(`${url}?api_key=${encodeURIComponent(apiKey)}`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
    }

    const raw = await response.text();

    let parsed;
    try {
      parsed = raw ? JSON.parse(raw) : null;
    } catch (e: any) {
      console.error("detailMovie parse error:", e);
      parsed = raw;
    }
    
    if (debugMode) {
      return res.status(200).json({
        tmdbStatus: response.status,
        tmdbBody: parsed,
        hasAccessToken: !!accessToken,
        lenAccessToken: accessToken ? accessToken.length : 0,
        hasApiKey: !!apiKey,
        lenApiKey: apiKey ? apiKey.length : 0,
      });
    }

    if (!response.ok) {
      // forward status & detail (lebih informatif)
      return res
        .status(response.status)
        .json({ success: false, message: "Failed to fetch from TMDB", detail: parsed });
    }

    return res.status(200).json(parsed ?? {});
  } catch (err: any) {
    console.error("detailMovie error:", err);
    res.status(500).json({ message: 'Something went wrong', error: err?.message ?? String(err)  });
  }
}

export default handler;
