import React from "react";

interface Props {
  DataPerPage: number;
  totalData: number;
  currentPage: number;
  paginate: (number: number) => void;
}

function Pagination({ DataPerPage, totalData, currentPage, paginate }: Props) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalData / DataPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <ul className=" flex rounded border border-blue-300">
      {pageNumbers.map((number) => (
        <li
          key={number}
          className="  border-x border-blue-300 hover:text-blue-300 "
        >
          <button
            type="button"
            onClick={() => paginate(number)}
            className={` px-2 py-1 ${
              currentPage === number ? "text-blue-300" : ""
            }`}
          >
            {number}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Pagination;
