import Image from "next/image";
import Link from "next/link";
import SearchComponent from "./components/Search";
import { Menu, Search, SearchX, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useMobile, useTablet, useDesktop, cn } from "@/lib/utils";
import Navigation from "./components/MainNavigation";

type HeaderProps = {
  searchValue?: string;
}

const Header = ({ searchValue = '' }: HeaderProps) => {
  // Check if current screen is a mobile or not
  const isMobile = useMobile();

  // Check if current screen is a tablet or not
  const isTablet = useTablet();

  // Check if current screen is a desktop or not
  const isDesktop = useDesktop();
  
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  const mainNavigation = [
    { label: "Home", href: "/" },
    {
      label: "Movies",
      items: [
        { label: "Now Playing", href: "/movie/now_playing" },
        { label: "Top Rated", href: "/movie/top_rated" },
        { label: "Upcoming", href: "/movie/upcoming" },
      ],
    },
  ];

  // Scroll state
  const [scrolled, setScrolled] = useState(false);

  // Set hasMounted to true after mounted
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // hide SearchComponent by default on mobile screen
  useEffect(() => {
    setShowSearch(isDesktop);
  }, [isDesktop, hasMounted]);

  // hide Main Menu by default on tablet screen
  useEffect(() => {
    setShowMenu(isDesktop);
  }, [isDesktop]);

  // Add class (bg color) to header
  // if user scrolled 100px or more
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // return null if not mounted yet to avoid hydration issue
  if (!hasMounted) return null;

  return (
    <header className={cn(
      "fixed top-0 text-foreground w-full z-[1001]",
      "transition-all duration-500",
      scrolled ? "bg-background" : "bg-transparent",
    )}>
      <div
        className="relative h-[60px] md:h-[80px] flex justify-between items-center gap-2
        container ml-auto mr-auto"
      >
        <Link href="/" onClick={() => {
          if (isMobile){
            setShowSearch(false);
            setShowMenu(false);
          }
        }}>
          <Image
            src="/assets/images/logo.svg"
            alt="Next.js logo"
            width={90}
            height={35}
            priority
            className="inline-block dark:hidden"
          />
          <Image
            src="/assets/images/logo-light.svg"
            alt="Next.js logo"
            width={90}
            height={35}
            priority
            className="hidden dark:inline-block"
          />
        </Link>

        {/* Show burger menu and/or search buttons on mobile and/or tablet screen */}
        {(isMobile || isTablet) && (
          <div className="flex gap-6 items-center">
            <button
              onClick={() => {
                setShowSearch(!showSearch);
                setShowMenu(false);
              }}
              aria-label="Show / hide search movie form"
            >
              {showSearch
                ? <SearchX size={28} />
                : <Search size={28} />}
            </button>

            <button
              onClick={() => {
                setShowMenu(!showMenu);
                setShowSearch(false);
              }}
              aria-label="Show / hide main navigation"
              className="z-[999]"
            >
              {showMenu
                ? <X size={28} />
                : <Menu size={28} />}
            </button>
          </div>
        )}

        {showSearch && (
          <div
            className={cn(
              "absolute top-[100%] right-0 left-0 py-3 px-4 w-full",
              "md:-translate-y-2/4 md:-translate-x-2/4 md:top-2/4 md:left-2/4 md:max-w-[350px]",
              "md:gap-6 md:flex-row md:items-center md:py-0 lg:max-w-[450px]",
              "transition-all duration-500",
              scrolled ? "bg-background lg:bg-transparent" : "bg-transparent",
            )}
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
        
        <Navigation menu={mainNavigation} showMenu={showMenu} setShowMenu={setShowMenu} />
      </div>
    </header>
  );
};

export default Header;
