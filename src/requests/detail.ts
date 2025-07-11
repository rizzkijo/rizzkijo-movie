export const fetchDetailMovie = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/detailMovie?id=${id}`);
  const data = await res.json();
  return data;
};
