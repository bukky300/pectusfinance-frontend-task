/* eslint-disable import/no-named-as-default */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Pagination from "./Pagination";

interface Props {
  columns: string[];
  data: { [key: string]: string }[];
}

function Table({ columns, data }: Props) {
  const [tableData, setTableData] = useState(data);
  // sorting state
  const [order, setOrder] = useState("ASC");
  const [sortedColumn, setSortedColumn] = useState("");
  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [DataPerPage] = useState(10);

  const navigate = useNavigate();

  // pagination variables
  const indexOfLastData = currentPage * DataPerPage;
  const indexOfFirstData = indexOfLastData - DataPerPage;
  const currentData = tableData.slice(indexOfFirstData, indexOfLastData);

  // change Page
  // const paginate = (pageNumber: number) => {
  //   setCurrentPage(pageNumber);
  // };

  const goToPrevpage = () => {
    setCurrentPage((page) => page - 1);
  };

  const goToNextpage = () => {
    setCurrentPage((page) => page + 1);
  };

  // Sort either by ascending or descending
  const sort = (col: string) => {
    setSortedColumn(col);
    if (order === "ASC") {
      if (col === "amount") {
        const sortedData = data.sort((a, b) => {
          return Number(a[col].replace(/[^0-9.-]+/g, "")) >
            Number(b[col].replace(/[^0-9.-]+/g, ""))
            ? 1
            : -1;
        });
        setTableData(sortedData);
        setOrder("DSC");
      } else if (col === "date") {
        const sortedData = data.sort((a, b) => {
          return new Date(a[col]) > new Date(b[col]) ? 1 : -1;
        });
        setTableData(sortedData);
        setOrder("DSC");
      } else {
        const sortedData = data.sort((a, b) => (a[col] > b[col] ? 1 : -1));
        setTableData(sortedData);
        setOrder("DSC");
      }
    } else if (order === "DSC") {
      if (col === "amount") {
        const sortedData = data.sort((a, b) => {
          return Number(a[col].replace(/[^0-9.-]+/g, "")) <
            Number(b[col].replace(/[^0-9.-]+/g, ""))
            ? 1
            : -1;
        });
        setTableData(sortedData);
        setOrder("ASC");
      } else if (col === "date") {
        const sortedData = data.sort((a, b) => {
          return new Date(a[col]) < new Date(b[col]) ? 1 : -1;
        });
        setTableData(sortedData);
        setOrder("ASC");
      } else {
        const sortedData = data.sort((a, b) => (a[col] < b[col] ? 1 : -1));
        setTableData(sortedData);
        setOrder("ASC");
      }
    }
  };

  return (
    <div
      data-testid="content"
      className="flex justify-center items-center my-5"
    >
      <div className="flex flex-col w-4/5">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr className="uppercase">
                    {columns.map((col) => (
                      <th
                        onClick={() => sort(col)}
                        key={col}
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        {col}
                        <span>
                          {sortedColumn === col
                            ? order === "ASC"
                              ? " 🔼"
                              : " 🔽"
                            : ""}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((row) => (
                    <tr className="border-b transition duration-300 ease-in-out hover:bg-gray-100">
                      {columns.map((col) => (
                        <td
                          key={col}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                        >
                          {row[col]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className=" self-center">
            <Pagination
              DataPerPage={DataPerPage}
              totalData={tableData.length}
              next={goToNextpage}
              prev={goToPrevpage}
              currentPage={currentPage}
            />
          </div>
          <div className=" self-center mt-2 md:mt-0 md:justify-self-end">
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
