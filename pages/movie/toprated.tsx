import Head from 'next/head'
import TopRatedPage from '@/src/modules/TopRated';

const TopRatedMoviesPage = () => (
  <>
    <Head>
      <title>Top Rated Movies</title>
    </Head>
    <TopRatedPage />
  </>
);

export default TopRatedMoviesPage;
