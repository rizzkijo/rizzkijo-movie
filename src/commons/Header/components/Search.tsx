import { useEffect, useState } from "react";
import Form from "next/form";
import { SearchComponentProps } from "@/src/commons/types";
import { Search } from "lucide-react";

const SearchComponent = ({
  className = '',
  placeholder = 'Search here...',
  searchValue = '',
  isMobile,
  setShowSearch,
}: SearchComponentProps) => {
  const [inputValue, setInputValue] = useState<string>(searchValue);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (inputValue.length < 3) {
      e.preventDefault();
    } else {
      if (isMobile) {
        setShowSearch(false);
      }
    }
  };

  // Set input value based on current query params
  useEffect(() => setInputValue(searchValue), [searchValue])

  return (
    <div className="search-wrapper">
      <Form action="/search" onSubmit={handleSubmit}>
        <div className="relative">
          <input
            name="query"
            type="search"
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={`
              transition-all
              w-full py-2 px-4 pr-[44px] box-border border-1 border-transparent
              focus:border-1 focus:border-neutral-500 focus:outline-none
              focus-visible:border-1 focus-visible:border-neutral-500 focus-visible:outline-none
            bg-neutral-200 rounded-md ${className}
            `}
          />
          <button
            type="submit"
            className="cursor-pointer absolute right-3 -translate-y-2/4 top-2/4 text-neutral-500"
          >
            <Search size={24} />
          </button>
        </div>
      </Form>
    </div>
  );
};

export default SearchComponent;
