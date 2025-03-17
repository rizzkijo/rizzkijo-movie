import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaginationProps } from "@/src/commons/types";
import Form from "next/form";
import { useState } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const [inputValue, setInputValue] = useState<number>(currentPage);
  const handleSubmitPage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ((inputValue > totalPages) || (inputValue < 1)) {
      if (inputValue !== currentPage) {
        setInputValue(currentPage);
      }
    } else {
      onPageChange(inputValue);
    }
  };

  return (
    <div className="flex gap-4 items-center justify-center">
      <button
        className="pagination-nav"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft size={18} />
      </button>
      <div className="flex items-center gap-2">
        <Form
          action="#"
          onSubmit={handleSubmitPage}
        >
          <input
            name="page"
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(Number(e.target.value))}
            className={`
              transition-all w-[50px] h-[40px] px-2 box-border border-1 border-neutral-600 no-spinner
              focus:border-1 focus:border-neutral-500 focus:outline-none text-center rounded-md
              focus-visible:border-1 focus-visible:border-neutral-500 focus-visible:outline-none
            `}
          />
        </Form>
        <span>{`/`}</span>
        <span>{totalPages}</span>
      </div>
      <button
        className="pagination-nav"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
