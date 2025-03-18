import Image from "next/image";
import Link from "next/link";
import SearchComponent from "./components/Search";
import { Menu, Search, SearchX, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useMobile, useTablet } from "@/src/commons/utils";
import { usePathname } from "next/navigation";

type HeaderProps = {
  searchValue?: string;
}

const Header = ({ searchValue = '' }: HeaderProps) => {
  // Function to check if current screen is a mobile or not
  // from @/src/utils
  const isMobile = useMobile();

  // Function to check if current screen is a mobile to tablet or not
  // from @/src/utils
  const isTablet = useTablet();

  const pathname = usePathname();
  
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
        <Link href="/" onClick={() => {
          if (isMobile){
            setShowSearch(false);
            setShowMenu(false);
          }
        }}>
          <Image
            // className="dark:invert"
            src="/assets/images/rizzkijo.svg"
            alt="Next.js logo"
            width={100}
            height={47}
            priority
          />
        </Link>

        {/* Show burger menu and/or search buttons on mobile and/or tablet screen */}
        {(isTablet || isMobile) && (
          <div className="flex gap-6 items-center">
            {/* Show search button only on mobile screen */}
            {isMobile && (
              <button
                onClick={() => {
                  setShowSearch(!showSearch);
                  setShowMenu(false);
                }}
              >
                {showSearch
                  ? <SearchX size={28} />
                  : <Search size={28} />}
              </button>
            )}

            {/* Show burder menu button on mobile to tablet screen */}
            {isTablet && (
              <button
                onClick={() => {
                  setShowMenu(!showMenu);
                  setShowSearch(false);
                }}
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
            <SearchComponent
              searchValue={searchValue}
              isMobile={isMobile}
              showSearch={showSearch}
              setShowSearch={setShowSearch}
              placeholder="Search movie..."
            />
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
            {[
              { href: "/", label: "Home" },
              { href: "/movie/nowplaying", label: "Now Playing" },
              { href: "/movie/toprated", label: "Top Rated" },
            ].map(({ href, label }) => (
              <li key={href} className="w-full md:w-auto">
                <Link
                  href={href}
                  onClick={() => isMobile && setShowMenu(false)}
                  className={`menu-item ${pathname === href ? "current" : ""}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
};

export default Header;
