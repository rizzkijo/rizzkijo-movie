import { GetServerSideProps } from 'next';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchDetailMovie } from '@/src/requests/detail';
import MovieDetailPage from '@/src/modules/MovieDetail';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();

  const id = String(ctx.query.id);
  
  const detailMovieQueryFn = () => fetchDetailMovie(id);

  await queryClient.prefetchQuery({
    queryKey: ['detail', id],
    queryFn: detailMovieQueryFn,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const DetailMoviePage = ({ dehydratedState }: { dehydratedState: unknown }) => (
  <HydrationBoundary state={dehydratedState}>
    <MovieDetailPage />
  </HydrationBoundary>
);

export default DetailMoviePage;
