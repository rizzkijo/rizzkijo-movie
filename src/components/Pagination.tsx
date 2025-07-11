import { ChevronLeft, ChevronRight } from "lucide-react";
import { type PaginationProps } from "../types";
import { useMobile } from "@/lib/utils";

const Pagination = ({ currentPage, totalPages, delta = 2, onPageChange }: PaginationProps) => {
  const isMobile = useMobile();
  const deltaValue = isMobile ? 0 : delta;

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
        className="pagination-nav px-3 py-1 rounded-md transition-colors cursor-pointer h-[40px] min-w-[40px] disabled:cursor-default"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft size={18} aria-hidden="true" />
      </button>

      {getPageNumbers().map((page, idx) =>
        page === "..." ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-foreground/70 select-none">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(Number(page))}
            className={`px-3 py-1 rounded-md transition-colors cursor-pointer h-[40px] min-w-[40px]
              disabled:cursor-default ${
              page === currentPage
                ? "bg-primary text-background font-bold"
                : "text-foreground/70 hover:bg-primary hover:text-background"
            }`}
            aria-current={page === currentPage ? "page" : undefined}
            disabled={page === currentPage}
          >
            {page}
          </button>
        )
      )}

      <button
        className="pagination-nav px-3 py-1 rounded-md transition-colors cursor-pointer h-[40px] min-w-[40px] disabled:cursor-default"
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
