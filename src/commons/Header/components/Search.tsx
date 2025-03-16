import { useEffect, useState } from "react";
import Form from "next/form";
import { SearchComponentProps } from "@/src/commons/types";
import { Search } from "lucide-react";

const SearchComponent = ({className = '', placeholder = 'Search here...', searchValue = ''}: SearchComponentProps) => {
  const [inputValue, setInputValue] = useState<string>(searchValue);

  useEffect(() => setInputValue(searchValue), [searchValue])

  return (
    <div className="search-wrapper">
      <Form action="/search">
        <div className="relative">
          <input
            name="query"
            type="search"
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={`
              transition-all
              w-full xl:w-[400px] py-2 px-4 pr-[44px] box-border border-1 border-transparent
              focus:border-1 focus:border-neutral-500 focus:outline-none
              focus-visible:border-1 focus-visible:border-neutral-500 focus-visible:outline-none
            bg-neutral-200 rounded-md ${className}
            `}
          />
          <span className="absolute right-3 -translate-y-2/4 top-2/4 text-neutral-500">
            <Search size={24} />
          </span>
        </div>
      </Form>
    </div>
  );
};

export default SearchComponent;
