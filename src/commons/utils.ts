import { useMediaQuery } from "@react-hookz/web";

// Check whether the current screen is a mobile or not
export const useMobile = () => useMediaQuery("(max-width: 767px)");

// Check whether the current screen is a mobile to tablet or not
export const useTablet = () => useMediaQuery("(min-width: 100px) and (max-width: 1180px)");

// Get TMDB images base url based on .env
export const TMDBImageBaseUrl = process.env.NEXT_PUBLIC_TMDB_ORIGINAL_IMAGE_BASEURL;
export const smTMDBImageBaseUrl = process.env.NEXT_PUBLIC_TMDB_SMALL_IMAGE_BASEURL;
export const mdTMDBImageBaseUrl = process.env.NEXT_PUBLIC_TMDB_MEDIUM_IMAGE_BASEURL;
export const lgTMDBImageBaseUrl = process.env.NEXT_PUBLIC_TMDB_LARGE_IMAGE_BASEURL;
