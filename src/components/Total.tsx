import React, { useState, useEffect, useContext } from "react";
import DropDown from "./DropDown";
import { Expense } from "../types/model";
import { ExpensesContext } from "../store/expenses-context";

interface Prop {
  fields: string[];
  data: Expense[];
}

function Total({ fields, data }: Prop) {
  const expensesCtx = useContext(ExpensesContext);
  const [value, setValue] = useState("departments");
  const [departmentVisible, setDepartmentVisible] = useState(false);
  const [projectnameVisible, setProjectname] = useState(false);
  const [dateVisible, setDateVisible] = useState(false);
  const [nameVisible, setNameVisible] = useState(false);
  const options = fields.filter((field) => field !== "amount");

  useEffect(() => {
    expensesCtx.setExpense(data);
  }, [data, expensesCtx]);

  useEffect(() => {
    value === "departments"
      ? setDepartmentVisible(true)
      : setDepartmentVisible(false);
    value === "project_name" ? setProjectname(true) : setProjectname(false);
    value === "date" ? setDateVisible(true) : setDateVisible(false);
    value === "member_name" ? setNameVisible(true) : setNameVisible(false);
  }, [value]);

  return (
    <div
      data-testid="totalcontent"
      className="flex flex-col items-center w-full justify-center my-28"
    >
      <div className="flex w-4/5 justify-end">
        <p className="mr-4">Total Expenses By:</p>
        <select
          className=" px-2 py-1 bg-gray-200 uppercase outline-none"
          onChange={(e) => setValue(e.target.value)}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      {departmentVisible && <DropDown category={value} />}
      {projectnameVisible && <DropDown category={value} />}
      {dateVisible && <DropDown category={value} />}
      {nameVisible && <DropDown category={value} />}
    </div>
  );
}

export default Total;
