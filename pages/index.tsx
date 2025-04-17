import { GetServerSideProps } from 'next';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import Head from 'next/head';
import Home from '@/src/modules/Home';
import { fetchPopular, fetchTopRated, fetchNowPlaying } from '@/src/requests/movieRequests';

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  
  const popularQueryFn = () => fetchPopular(1, 5);
  const topRatedQueryFn = () => fetchTopRated(1, 8);
  const nowPlayingQueryFn = () => fetchNowPlaying(1, 8);

  await queryClient.prefetchQuery({
    queryKey: ['popular', 1, 5],
    queryFn: popularQueryFn,
  });

  await queryClient.prefetchQuery({
    queryKey: ['toprated', 1, 8],
    queryFn: topRatedQueryFn,
  });

  await queryClient.prefetchQuery({
    queryKey: ['nowplaying', 1, 8],
    queryFn: nowPlayingQueryFn,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Homepage = ({ dehydratedState }: { dehydratedState: unknown }) => {
  return (
    <HydrationBoundary state={dehydratedState}>
      <Head>
        <title>Homepage</title>
      </Head>
      <Home />
    </HydrationBoundary>
  )
};

export default Homepage;
