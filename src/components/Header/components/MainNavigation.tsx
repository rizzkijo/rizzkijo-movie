import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, useMobile } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

type MenuItem = {
  label: string;
  href?: string;
  items?: { label: string; href: string }[];
};

type Props = {
  menu: MenuItem[];
  showMenu?: boolean;
  setShowMenu?: (value: boolean | ((prev: boolean) => boolean)) => void;
};

const Navigation = ({ menu, showMenu, setShowMenu }: Props) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const parentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isMobile = useMobile();
  const pathname = usePathname();

  const toggleDropdown = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // On mobile, close submenu if click is outside the open parent menu item
      if (isMobile && openIndex !== null) {
        const parentRef = parentRefs.current[openIndex];
        if (parentRef && event.target instanceof Node && !parentRef.contains(event.target)) {
          setOpenIndex(null);
        }
        return;
      }
      // On desktop, close submenu if click is outside the nav
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node)
      ) {
        setOpenIndex(null);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isMobile, openIndex]);

  const handleSubItemClick = () => {
    if (isMobile && setShowMenu) {
      setShowMenu(false);
    }
  };

  return (
    <nav
      ref={navRef}
      className={cn(
        "flex flex-col gap-1 items-start justify-start shadow-lg bg-background py-6",
        "fixed top-0 bottom-0 -left-[100vw] w-[100vw]",
        "transition-all duration-200 py-2",
        "-md:left-[100vw] md:w-[100vw] md:py-3",
        "lg:absolute lg:top-[50%] lg:-translate-2/4 lg:right-0 lg:bottom-[unset] lg:left-[50%] lg:justify-center lg:gap-8 lg:hidden lg:bg-transparent",
        "xl:static xl:top-[unset] xl:right-[unset] xl:translate-none xl:w-auto xl:justify-center xl:gap-8 xl:flex-row xl:bg-transparent xl:py-0",
        "xl:items-center xl:shadow-none xl:py-0",
        "xl:static xl:justify-start",
        showMenu && "left-0 lg:flex lg:w-max lg:flex-row lg:shadow-none",
      )}
    >
      {isMobile && (
        <div>
          <h3 className="py-[10px] px-4 font-medium text-lg">Main Menu</h3>
        </div>
      )}
      {menu.map((item, index) => (
        <div
          key={index}
          className="text-base w-full lg:w-auto relative"
          ref={el => { parentRefs.current[index] = el; }}
        >
          <Link
            href={item.href || '#'}
            onClick={(e) => {
              if (item.items) {
                e.preventDefault();
                toggleDropdown(index);
                return;
              }
              if (isMobile && setShowMenu) {
                setShowMenu(false);
              }
              setTimeout(() => {
                setOpenIndex(null);
              }, 500);
            }}
            className={`menu-item ${pathname === item.href ? "current" : ""}`}
            aria-label={item.label}
          >
            {item.label}
            {Array.isArray(item.items) && item.items.length > 0 && (
              <span className={cn(
                "transition-all duration-200",
                item.items && openIndex === index  && "rotate-180",
              )}>
                <ChevronDown size={18} />
              </span>
            )}
          </Link>

          <ul className={cn(
            "w-full bg-foreground/5 shadow-lg overflow-hidden py-2",
            "z-10 transition-all duration-300",
            "lg:absolute lg:right-0 lg:top-full lg:rounded-lg lg:w-max",
            "lg:-mt-4 lg:py-4 lg:bg-card lg:opacity-0 lg:invisible",
            !isMobile && item.items && openIndex === index  && "lg:opacity-100 lg:visible lg:mt-0",
            isMobile && "max-h-0 py-0",
            isMobile &&  openIndex === index && "max-h-[2000px]",
          )}>
            {item?.items?.map((subItem, subIndex) => (
              <li key={subIndex}>
                <Link
                  href={subItem.href}
                  onClick={() => {
                    handleSubItemClick();
                    setTimeout(() => {
                      setOpenIndex(null);
                    }, 500);
                  }}
                  className={`block px-8 py-3 hover:bg-background/50 ${
                    pathname === subItem.href ? "font-semibold" : ""
                  }`}
                  aria-label={subItem.label}
                >
                  {subItem.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
};

export default Navigation;
