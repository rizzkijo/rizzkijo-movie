import Head from 'next/head'
import NowPlayingPage from '@/src/modules/NowPlaying';

const NowPlayingMoviesPage = () => (
  <>
    <Head>
      <title>Now Playing Movies</title>
    </Head>
    <NowPlayingPage />
  </>
);

export default NowPlayingMoviesPage;
