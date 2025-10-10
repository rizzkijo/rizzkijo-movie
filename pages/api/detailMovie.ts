import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const accessToken = process.env.TMDB_ACCESS_TOKEN;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({ success: false, message: 'Failed to fetch from TMDB' });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err });
  }
}

export default handler;
