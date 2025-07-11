import Image from "next/image";
import Link from "next/link";
import SearchComponent from "./components/Search";
import { ChevronDown, Menu, Search, SearchX, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useMobile, useTablet, useDesktop, cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

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

  const pathname = usePathname();
  
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [hasMounted, setHasMounted] = useState<boolean>(false);

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

        <ul
          className={cn(
            "flex flex-col gap-1 items-start justify-start shadow-lg bg-background py-6",
            "fixed top-0 bottom-0 -left-[calc(100vw_-_60px)] w-[calc(100vw_-_60px)]",
            "transition-all duration-200 py-2",
            "-md:left-[calc(100vw_-_100px)] md:w-[calc(100vw_-_100px)] md:py-3",
            "lg:absolute lg:top-[50%] lg:-translate-2/4 lg:right-0 lg:bottom-[unset] lg:left-[50%] lg:justify-center lg:gap-8 lg:hidden lg:bg-transparent",
            "xl:static xl:top-[unset] xl:right-[unset] xl:translate-none xl:w-auto xl:justify-center xl:gap-8 xl:flex-row xl:bg-transparent xl:py-0",
            "xl:items-center xl:shadow-none xl:py-0",
            "xl:static xl:justify-start",
            showMenu && "left-0 lg:flex lg:w-max lg:flex-row lg:shadow-none",
          )}
        >
          {[
            { href: "/", label: "Home", ariaLabel: "Go to Homepage", children: [] },
            {
              href: "#",
              label: "Movies",
              ariaLabel: "Movies",
              children: [
                {
                  href: "/movie/now_playing/",
                  label: "Now Playing",
                  ariaLabel: "See now playing movies",
                },
                {
                  href: "/movie/top_rated/",
                  label: "Top Rated",
                  ariaLabel: "See top rated movies",
                },
                {
                  href: "/movie/upcoming/",
                  label: "Upcoming",
                  ariaLabel: "See upcoming movies",
                },
              ],
            },
          ].map(({ href, label, ariaLabel, children }) => (
            <li key={href} className="text-base w-full md:w-auto relative group">
              <Link
                href={href}
                onClick={(e) => {
                  if (!href || href === "#") {
                    e.preventDefault();
                    return;
                  }
                  if (isMobile) setShowMenu(false);
                }}
                className={`menu-item ${pathname === href ? "current" : ""}`}
                aria-label={ariaLabel}
              >
                {label}
                {children.length > 0 && (
                  <span className="transition-all duration-200 group-hover:rotate-180">
                    <ChevronDown size={18} />
                  </span>
                )}
              </Link>

              {/* Submenu */}
              {children.length > 0 && (
                <ul className={cn(
                  "absolute right-0 top-full -mt-4 w-max bg-card shadow-lg rounded-lg overflow-hidden",
                  "py-4 opacity-0 invisible z-10 transition-all duration-200",
                  "group-hover:opacity-100 group-hover:visible group-hover:mt-0",
                )}>
                  {children.map(({ href, label, ariaLabel }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={() => isMobile && setShowMenu(false)}
                        className={`block px-8 py-3 hover:bg-background/50 ${
                          pathname === href ? "font-semibold" : ""
                        }`}
                        aria-label={ariaLabel}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
