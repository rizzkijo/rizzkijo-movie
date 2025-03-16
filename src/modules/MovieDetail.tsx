import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
// import { detailMovieProps } from "@/src/commons/types";

const MovieDetail = () => {
  const accessToken = process.env.NEXT_PUBLIC_TMDB_ACESS_TOKEN;
  const router = useRouter();
  const { id } = router?.query;

  const fetchOptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  };

  const { data, isFetching, isPending, isError, error } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, fetchOptions);
      
      return res.json();
    },
  });

  console.log('jotest data', data);
  console.log('jotest isFetching', isFetching);
  console.log('jotest isPending', isPending);
  console.log('jotest isError', isError);
  console.log('jotest error', error);

  return (
    <>
      <Head>
        <title>{`${data?.title || data?.original_title} (${new Date(data?.release_date || '0').getFullYear()})`}</title>
      </Head>
      <div className="flex flex-col items-center sm:items-start w-full max-w-container px-4 mx-auto">
        <h1>Hohohoho</h1>
      </div>
    </>
  );
};

export default MovieDetail;
