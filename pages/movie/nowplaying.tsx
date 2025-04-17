import { GetServerSideProps } from 'next';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import Head from 'next/head';
import { fetchNowPlaying } from '@/src/requests/movieRequests';
import NowPlayingPage from '@/src/modules/NowPlaying';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();

  const page = Number(ctx.query.page ?? 1);
  
  const nowPlayingQueryFn = () => fetchNowPlaying(page);

  await queryClient.prefetchQuery({
    queryKey: ['nowplaying', page, 0],
    queryFn: nowPlayingQueryFn,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const NowPlayingMoviesPage = ({ dehydratedState }: { dehydratedState: unknown }) => (
  <HydrationBoundary state={dehydratedState}>
    <Head>
      <title>Now Playing Movies</title>
    </Head>
    <NowPlayingPage />
  </HydrationBoundary>
);

export default NowPlayingMoviesPage;
