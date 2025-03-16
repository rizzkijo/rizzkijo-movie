import Head from 'next/head'
import SearchView from "@/src/modules/Search";
import { useRouter } from "next/router";

const Searchpage = () => {
  const router = useRouter();
  const searchValue = Array.isArray(router?.query?.query)
    ? router?.query?.query[0]
    : router?.query?.query || "";

  return (
    <>
      <Head>
        <title>Search Movies: {searchValue}</title>
      </Head>
      <SearchView />
    </>
  );
};

export default Searchpage;
