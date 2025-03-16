import Image from "next/image";
import Link from "next/link";
import SearchComponent from "./components/Search";
import { useMediaQuery } from "@react-hookz/web";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

type HeaderProps = {
  searchValue?: string;
}

const Header = ({ searchValue = '' }: HeaderProps) => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [showMenu, setShowMenu] = useState<boolean>(!isMobile);
  console.log('jotest showMenu', showMenu);

  useEffect(() => {
    if (isMobile) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  }, [isMobile])

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
        {!isMobile && <SearchComponent searchValue={searchValue} />}
        {isMobile && (
          <button
            onClick={() => setShowMenu(!showMenu)}
          >
            <Menu size={24} />
          </button>
        )}
        {showMenu && (
          <ul
            className="flex flex-col gap-1 items-start justify-start shadow-lg
            absolute top-[100%] right-0 left-0 bg-white py-4
            md:static md:gap-6 md:flex-row md:items-center md:shadow-none md:py-0"
          >
            <li className="w-full md:w-auto">
              <Link
                href="#"
                className="text-neutral-500 hover:text-neutral-700 transition-all
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
