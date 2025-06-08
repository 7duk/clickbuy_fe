import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  size: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  size,
  numberOfElements,
  totalElements,
  totalPages,
  onPageChange,
}) => {
  const delta = 2;
  const maxVisiblePages = delta * 2 + 3;

  // Helper function to get page numbers
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const leftBoundary = 3;
      const rightBoundary = totalPages - 2;

      if (currentPage <= leftBoundary) {
        for (let i = 1; i <= leftBoundary + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= rightBoundary) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - leftBoundary; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - delta; i <= currentPage + delta; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const startItem = (currentPage - 1) * size + 1;
  const endItem = startItem + numberOfElements - 1;

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 w-full">
      {/* Mobile view */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          Next
        </button>
      </div>

      {/* Desktop view */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between w-full">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{startItem}</span> to{" "}
            <span className="font-medium">{endItem}</span> of{" "}
            <span className="font-medium">{totalElements}</span> results
          </p>
        </div>

        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            {/* Previous button */}
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-gray-300 ring-inset focus:z-20 focus:outline-offset-0 ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-400 hover:bg-gray-50"
              }`}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>

            {/* Page numbers */}
            {getPageNumbers().map((page, index) => {
              if (page === "...") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 ring-inset focus:outline-offset-0"
                  >
                    ...
                  </span>
                );
              }

              const pageNumber = page as number;
              const isCurrentPage = pageNumber === currentPage;

              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageClick(pageNumber)}
                  aria-current={isCurrentPage ? "page" : undefined}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus:outline-offset-0 ${
                    isCurrentPage
                      ? "z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      : "text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            {/* Next button */}
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-gray-300 ring-inset focus:z-20 focus:outline-offset-0 ${
                currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-400 hover:bg-gray-50"
              }`}
            >
              <span className="sr-only">Next</span>
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
