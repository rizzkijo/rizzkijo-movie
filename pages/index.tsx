import { GetServerSideProps } from 'next';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import Head from 'next/head';
import Home from '@/src/modules/Home';
import { fetchTrending } from '@/src/requests/trending';
import { useAppStore } from '@/src/stores/themeStore';
import { fetchCategoryMovies } from '@/src/requests/category';
// import { fetchNowPlaying } from '@/src/requests/nowPlaying';
// import { fetchTopRated } from '@/src/requests/topRated';
// import { fetchPopular } from '@/src/requests/popular';

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  
  // const trendingQueryFn = () => fetchTrending("day", 10);
  // const popularQueryFn = () => fetchPopular(1, 10);
  // const topRatedQueryFn = () => fetchTopRated(1, 10);
  // const nowPlayingQueryFn = () => fetchNowPlaying(1, 5);

  await queryClient.prefetchQuery({
    queryKey: ['nowplaying', 1, 5],
    queryFn: () => fetchCategoryMovies('now_playing', 1, 5),
  });

  await queryClient.prefetchQuery({
    queryKey: ['trending', 'day', 10],
    queryFn: () => fetchTrending("day", 10),
  });

  await queryClient.prefetchQuery({
    queryKey: ['toprated', 1, 10],
    queryFn: () => fetchCategoryMovies('top_rated', 1, 10),
  });

  await queryClient.prefetchQuery({
    queryKey: ['upcoming', 1, 5],
    queryFn: () => fetchCategoryMovies('upcoming', 1, 10),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Homepage = () => {
  const { appName } = useAppStore();

  return (
    <>
      <Head>
        <title>{`Homepage | ${appName}`}</title>

        <meta name="description" content="Temukan berbagai film terbaru, terpopuler, dan top rating dari seluruh dunia. Website ini menampilkan daftar film yang diambil langsung dari The Movie Database (TMDB) lengkap dengan poster, sinopsis, dan rating penonton." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />

        <meta property="og:title" content={`Homepage | ${appName}`} />
        <meta property="og:description" content="Temukan berbagai film terbaru, terpopuler, dan top rating dari seluruh dunia. Website ini menampilkan daftar film yang diambil langsung dari The Movie Database (TMDB) lengkap dengan poster, sinopsis, dan rating penonton." />
        <meta property="og:image" content="/assets/images/logo.svg" />
        <meta property="og:type" content="website" />
      </Head>
      <Home />
    </>
  )
};

export default Homepage;
