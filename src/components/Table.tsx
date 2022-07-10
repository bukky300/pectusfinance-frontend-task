import React from "react";
import { useNavigate } from "react-router-dom";
import { useTable, useSortBy, usePagination, Column } from "react-table";

import { Expense } from "../types/model";

interface Props {
  columns: {}[];
  data: Expense[];
}

function Table({ columns, data }: Props) {
  const navigate = useNavigate();

  // react-table hook
  const tableInstance = useTable(
    {
      columns: columns as Column<{}>[],
      data,
    },
    useSortBy,
    usePagination
  );

  // destructuring react-table functions
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    canNextPage,
    canPreviousPage,
    nextPage,
    previousPage,
    prepareRow,
  } = tableInstance;

  return (
    <div
      data-testid="content"
      className="flex justify-center items-center mt-5"
    >
      <div className="flex flex-col w-4/5">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full" {...getTableProps()}>
                <thead className="border-b">
                  {headerGroups.map((headerGroup) => (
                    <tr
                      className="uppercase"
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      {headerGroup.headers.map((column) => (
                        <th
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          {column.render("Header")}
                          <span>
                            <span>
                              {column.isSorted
                                ? column.isSortedDesc
                                  ? " 🔽"
                                  : " 🔼"
                                : ""}
                            </span>
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr
                        className="border-b transition duration-300 ease-in-out hover:bg-gray-100"
                        {...row.getRowProps()}
                      >
                        {row.cells.map((cell) => {
                          return (
                            <td
                              className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                              {...cell.getCellProps()}
                            >
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <button
              type="button"
              onClick={previousPage}
              className={` px-4 py-2.5 rounded text-xs  mr-2
                hover:bg-blue-700 hover:shadow-lg ${
                  !canPreviousPage
                    ? "bg-gray-100 pointer-events-none "
                    : "bg-blue-600 text-white"
                } `}
              disabled={!canPreviousPage}
            >
              Prev
            </button>
            <button
              type="button"
              onClick={nextPage}
              className={` px-4 py-2.5 rounded text-xs
                hover:bg-blue-700 hover:shadow-lg ${
                  !canNextPage
                    ? "bg-gray-100 pointer-events-none "
                    : "bg-blue-600 text-white"
                } `}
              disabled={!canNextPage}
            >
              Next
            </button>
          </div>
          <div className=" justify-self-end">
            <button
              type="button"
              onClick={() => navigate("total")}
              data-testid="button"
              className="bg-blue-600 px-4 py-2.5 rounded text-xs text-white
            hover:bg-blue-700 hover:shadow-lg"
            >
              Go To Total
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
