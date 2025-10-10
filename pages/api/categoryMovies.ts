import type { NextApiRequest, NextApiResponse } from 'next';

const CATEGORY_ENDPOINTS: Record<string, string> = {
  now_playing: 'now_playing',
  popular: 'popular',
  top_rated: 'top_rated',
  upcoming: 'upcoming',
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { category, page = 1 } = req.query;
  const accessToken = process.env.TMDB_ACCESS_TOKEN;

  if (!category || typeof category !== 'string' || !CATEGORY_ENDPOINTS[category]) {
    return res.status(400).json({ message: 'Invalid or missing category' });
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${CATEGORY_ENDPOINTS[category]}?page=${page}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({ message: 'Failed to fetch from TMDB' });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err });
  }
};

export default handler; 