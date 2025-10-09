import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // 1) Batasi method
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // 2) Validasi & default param
  const raw = req.query.time;
  const time = (Array.isArray(raw) ? raw[0] : raw) ?? 'day';
  if (time !== 'day' && time !== 'week') {
    return res.status(400).json({ message: "Invalid 'time'. Use 'day' or 'week'." });
  }

  // 3) Pastikan token ada
  const accessToken = process.env.TMDB_ACCESS_TOKEN;
  if (!accessToken) {
    return res.status(500).json({ message: 'Missing TMDB_ACCESS_TOKEN on server' });
  }

  // 4) Timeout fetch (mis. 10s)
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/${time}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        signal: controller.signal,
      }
    );

    clearTimeout(t);

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      
      return res
        .status(response.status)
        .json({ message: 'TMDB request failed', detail: text || undefined });
    }

    const data = await response.json();

    // 5) Cache: 60s di browser, 300s di CDN/proxy (sesuaikan kebutuhanmu)
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=60');
    
    res.status(200).json(data);
  } catch (err: unknown) {
    // AbortError → timeout
    if (err instanceof DOMException && err.name === 'AbortError') {
      return res.status(504).json({ message: 'Upstream timeout' });
    }
    if (err instanceof Error) {
      return res.status(500).json({ message: 'Unexpected error', error: err.message });
    }
    return res.status(500).json({ message: 'Unexpected error' });
  }
}

export default handler;
