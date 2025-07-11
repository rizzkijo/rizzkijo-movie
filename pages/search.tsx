import Head from 'next/head'
import { GetServerSideProps } from 'next';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { fetchSearchMovies } from '@/src/requests/search';
import SearchView from '@/src/modules/Search';
import { useAppStore } from '@/src/stores/themeStore';

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

const Searchpage = ({ searchValue }: { searchValue: string }) => {
  const { appName } = useAppStore();

  return (
    <>
      <Head>
        <title>{`Search: ${searchValue} | ${appName}`}</title>
        <meta property="og:title" content={`Search: ${searchValue} | ${appName}`} />
      </Head>
      <SearchView />
    </>
  );
};

export default Searchpage;
