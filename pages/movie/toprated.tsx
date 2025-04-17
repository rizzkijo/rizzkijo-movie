import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchTopRated } from '@/src/requests/movieRequests';
import TopRatedPage from '@/src/modules/TopRated';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();

  const page = Number(ctx.query.page ?? 1);
  
  const topRatedQueryFn = () => fetchTopRated(page);

  await queryClient.prefetchQuery({
    queryKey: ['toprated', page, 0],
    queryFn: topRatedQueryFn,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const TopRatedMoviesPage = ({ dehydratedState }: { dehydratedState: unknown }) => (
  <HydrationBoundary state={dehydratedState}>
    <Head>
      <title>Top Rated Movies</title>
    </Head>
    <TopRatedPage />
  </HydrationBoundary>
);

export default TopRatedMoviesPage;
