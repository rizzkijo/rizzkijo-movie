import { useEffect, useState, useRef } from "react";
import Form from "next/form";
import { SearchComponentProps } from "@/src/types";
import { Info, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const SearchComponent = ({
  className = '',
  placeholder = 'Search here...',
  searchValue = '',
  isMobile,
  showSearch,
  setShowSearch,
}: SearchComponentProps) => {
  const [inputValue, setInputValue] = useState<string>(searchValue);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // State for search terms, 'true' if user submit search form with less than 3 characters 
  const [searchWarning, setSearchWarning] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (inputValue.length < 3) {
      e.preventDefault();
      setSearchWarning(true);
      setTimeout(() => {
        setSearchWarning(false);
      }, 2000);
    } else {
      if (isMobile) {
        setShowSearch(false);
      }
    }
  };

  // Set input value based on current query params
  useEffect(() => setInputValue(searchValue), [searchValue]);

  useEffect(() => {
    if (isMobile && showSearch) {
      searchInputRef.current?.focus();
    }
  }, [isMobile, showSearch]);

  return (
    <div className="search-wrapper">
      <Form action="/search" onSubmit={handleSubmit}>
        <div className="relative">
          <input
            ref={searchInputRef}
            name="query"
            type="search"
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={cn(
              "transition-all w-full h-[50px] pl-5 pr-[64px] box-border border border-transparent rounded-full ring-1 ring-foreground",
              "focus:border-foreground focus:outline-none focus-visible:outline-none placeholder:text-foreground/65",
              className,
            )}
          />

          <button
            type="submit"
            className="cursor-pointer absolute right-0 px-5 h-[50px] rounded-full text-center"
            title={placeholder}
            aria-label="Search movie button"
          >
            <Search size={24} />
          </button>

          {/* Show warning info if user submit search form with less than 3 characters */}
          {searchWarning && (
            <div className={`search-tooltip absolute top-[calc(100%_+_10px)] left-0 ${searchWarning && 'active'}`}>
                <div
                  className="bg-red-600 text-foreground text-sm flex gap-2
                  items-center py-2 px-4 rounded-md"
                >
                  <Info size={18} />
                  <p>Input min. 3 characters..</p>
                </div>
            </div>
          )}
        </div>
      </Form>
    </div>
  );
};

export default SearchComponent;
