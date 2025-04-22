import Head from 'next/head'
import { GetServerSideProps } from 'next';
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { fetchSearchMovies } from '@/src/requests/movieRequests';
import SearchView from "@/src/modules/Search";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();

  const searchValue = String(ctx.query.query ?? '');
  const page = Number(ctx.query.page ?? 1);
  
  const searchMoviesQueryFn = () => fetchSearchMovies(searchValue, page);

  await queryClient.prefetchQuery({
    queryKey: ['search', page],
    queryFn: searchMoviesQueryFn,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      searchValue,
    },
  };
};

const Searchpage = ({ dehydratedState, searchValue }: { dehydratedState: unknown, searchValue: string }) => (
  <HydrationBoundary state={dehydratedState}>
    <Head>
      <title>Search Movies: {searchValue}</title>
    </Head>
    <SearchView />
  </HydrationBoundary>
);

export default Searchpage;
