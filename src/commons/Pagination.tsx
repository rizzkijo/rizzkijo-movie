// import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaginationProps } from "@/src/commons/types";
import { useMobile } from "./utils";
// import Form from "next/form";

const Pagination = ({ currentPage, totalPages, delta = 2, onPageChange }: PaginationProps) => {
  const isMobile = useMobile();
  const deltaValue = isMobile ? 0 : delta;
  // const [inputValue, setInputValue] = useState<number>(currentPage);

  // useEffect(() => {
  //   setInputValue(currentPage);
  // }, [currentPage]);

  // const handleSubmitPage = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if (inputValue < 1 || inputValue > totalPages) {
  //     if (inputValue !== currentPage) {
  //       setInputValue(currentPage);
  //     }
  //   } else {
  //     onPageChange(inputValue);
  //   }
  // };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    const rangeStart = Math.max(2, currentPage - deltaValue);
    const rangeEnd = Math.min(totalPages - 1, currentPage + deltaValue);

    pages.push(1);
    if (rangeStart > 2) pages.push("...");

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    if (rangeEnd < totalPages - 1) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <div
      className="flex gap-2 items-center justify-center"
      role="navigation"
      aria-label="Pagination"
    >
      <button
        className="pagination-nav"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft size={18} aria-hidden="true" />
      </button>

      {getPageNumbers().map((page, idx) =>
        page === "..." ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-neutral-500 select-none">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(Number(page))}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer h-[40px] min-w-[40px]
              disabled:cursor-default ${
              page === currentPage
                ? "bg-neutral-200 text-black/80 font-bold"
                : "hover:bg-neutral-100 text-neutral-700"
            }`}
            aria-current={page === currentPage ? "page" : undefined}
            disabled={page === currentPage}
          >
            {page}
          </button>
        )
      )}

      <button
        className="pagination-nav"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        <ChevronRight size={18} aria-hidden="true" />
      </button>
    </div>
  );
};

export default Pagination;
