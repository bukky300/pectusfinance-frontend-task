import React from "react";

interface Props {
  DataPerPage: number;
  totalData: number;
  currentPage: number;
  next: () => void;
  prev: () => void;
}

export function Pagination({
  DataPerPage,
  totalData,
  currentPage,
  next,
  prev,
}: Props) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalData / DataPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => prev()}
        className={` px-4 py-2.5 rounded text-xs  mr-2
                hover:bg-blue-700 hover:shadow-lg ${
                  currentPage === 1
                    ? "bg-gray-100 pointer-events-none "
                    : "bg-blue-600 text-white"
                } `}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <button
        type="button"
        onClick={() => next()}
        className={` px-4 py-2.5 rounded text-xs
                hover:bg-blue-700 hover:shadow-lg ${
                  currentPage === pageNumbers.length
                    ? "bg-gray-100 pointer-events-none "
                    : "bg-blue-600 text-white"
                } `}
        disabled={currentPage === pageNumbers.length}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
