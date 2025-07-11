import { GetServerSideProps } from 'next';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import Head from 'next/head';
// import { useRouter } from 'next/router';
import { fetchCategoryMovies } from '@/src/requests/category';
import CategoryMovie from '@/src/modules/MovieCategory';
import { useAppStore } from '@/src/stores/themeStore';
// import { useCategoryMovies } from '@/src/hooks/useCategoryMovies';
// import MovieCard from '@/src/components/movieCard';
// import { MoviesProps } from '@/src/types';

const CATEGORY_MAP = {
  now_playing: 'Now Playing Movies',
  popular: 'Popular Movies',
  top_rated: 'Top Rated Movies',
  upcoming: 'Upcoming Movies',
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient();
  const { category } = ctx.params || {};
  const page = Number(ctx.query.page ?? 1);

  if (!category || !Object.keys(CATEGORY_MAP).includes(category as string)) {
    return { notFound: true };
  }

  await queryClient.prefetchQuery({
    queryKey: [category, page, 0],
    queryFn: () => fetchCategoryMovies(category as string, page),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      category,
    },
  };
};

const CategoryMoviesPage = ({ category }: { dehydratedState: unknown; category: string }) => {
  const { appName } = useAppStore();
  const title = CATEGORY_MAP[category as keyof typeof CATEGORY_MAP] || 'Movies';

  return (
    <>
      <Head>
        <title>{`${title} | ${appName}`}</title>
        <meta name="description" content="Jelajahi berbagai kategori film seperti aksi, komedi, horor, dan banyak lagi. Temukan film terbaik di setiap genre lengkap dengan poster, sinopsis, dan rating dari The Movie Database (TMDB)." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />

        <meta property="og:title" content={`${title} | ${appName}`} />
        <meta property="og:description" content="Jelajahi berbagai kategori film seperti aksi, komedi, horor, dan banyak lagi. Temukan film terbaik di setiap genre lengkap dengan poster, sinopsis, dan rating dari The Movie Database (TMDB)." />
        <meta property="og:image" content="/assets/images/logo.svg" />
        <meta property="og:type" content="website" />
      </Head>
      <CategoryMovie title={title} category={category} />
    </>
  );
};

export default CategoryMoviesPage; 