import Image from "next/image";
import Link from "next/link";
import SearchComponent from "./components/Search";
import { useMediaQuery } from "@react-hookz/web";
import { Menu, Search, SearchX, X } from "lucide-react";
import { useEffect, useState } from "react";

type HeaderProps = {
  searchValue?: string;
}

const Header = ({ searchValue = '' }: HeaderProps) => {
  // Check if current screen is mobile or not
  const isMobile = useMediaQuery("(max-width: 767px)");

  // Check if current screen is mobile & tablet or not
  const isTablet = useMediaQuery("(min-width: 100px) and (max-width: 1180px)");
  
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  // Set hasMounted to true after mounted
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // hide SearchComponent by default on mobile screen
  useEffect(() => {
    setShowSearch(!isMobile);
  }, [isMobile, hasMounted]);

  // hide Main Menu by default on tablet screen
  useEffect(() => {
    setShowMenu(!isTablet);
  }, [isTablet, hasMounted]);

  // return null if not mounted yet to avoid hydration issue
  if (!hasMounted) return null;

  return (
    <header className="fixed top-0 bg-white w-full shadow-lg z-[999]">
      <div
        className="relative h-[60px] px-4 flex justify-between items-center gap-2
        max-w-container ml-auto mr-auto"
      >
        <Link href="/">
          <Image
            // className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={120}
            height={25}
            priority
          />
        </Link>
        {(isTablet || isMobile) && (
          <div className="flex gap-6 items-center">
            {isMobile && (
              <button
                onClick={() => setShowSearch(!showSearch)}
              >
                {showSearch
                  ? <SearchX size={28} />
                  : <Search size={28} />}
              </button>
            )}
            {isTablet && (
              <button
                onClick={() => setShowMenu(!showMenu)}
              >
                {showMenu
                  ? <X size={28} />
                  : <Menu size={28} />}
              </button>
            )}
          </div>
        )}
        {showSearch && (
          <div
            className="shadow-lg absolute top-[100%] right-0 left-0 bg-white py-3 px-4 w-full
            md:-translate-y-2/4 md:-translate-x-2/4 md:top-2/4 md:left-2/4 md:max-w-[350px]
            md:gap-6 md:flex-row md:items-center md:shadow-none md:py-0 lg:max-w-[450px]"
          >
            <SearchComponent searchValue={searchValue} placeholder="Search movie..." />
          </div>
        )}
        {showMenu && (
          <ul
            className="flex flex-col gap-1 items-start justify-start shadow-lg
            absolute top-[100%] right-0 left-0 bg-white py-3
            md:justify-center md:gap-6 md:flex-row
            lg:items-center lg:shadow-none md:py-0
            xl:static xl:justify-start"
          >
            <li className="w-full md:w-auto">
              <Link
                href="/"
                className="text-neutral-500 hover:text-neutral-700 transition-all
                hover:bg-gray-100 md:hover:bg-transparent
                ease-[ease-in-out] py-2 px-4 inline-block w-full
                md:w-auto"
              >
                Home
              </Link>
            </li>
            <li className="w-full md:w-auto">
              <Link
                href="#"
                className="text-neutral-500 hover:text-neutral-700 transition-all
                hover:bg-gray-100 md:hover:bg-transparent
                ease-[ease-in-out] py-2 px-4 inline-block w-full
                md:w-auto"
              >
                About
              </Link>
            </li>
            <li className="w-full md:w-auto">
              <Link
                href="#"
                className="text-neutral-500 hover:text-neutral-700 transition-all
                hover:bg-gray-100 md:hover:bg-transparent
                ease-[ease-in-out] py-2 px-4 inline-block w-full
                md:w-auto"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
