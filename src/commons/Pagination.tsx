import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaginationProps } from "@/src/commons/types";

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className="flex gap-4 items-center justify-center">
      <button
        className="w-[40px] h-[40px] bg-black text-white
        rounded flex items-center justify-center cursor-pointer
        hover:bg-black/80 disabled:opacity-30 disabled:cursor-default disabled:hover:bg-black"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft size={18} />
      </button>
      <div className="flex items-center">
        {`Page ${currentPage} / ${totalPages}`}
      </div>
      <button
        className="w-[40px] h-[40px] bg-black text-white
        rounded flex items-center justify-center cursor-pointer
        hover:bg-black/80 disabled:opacity-30 disabled:cursor-default disabled:hover:bg-black"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
