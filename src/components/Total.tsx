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
  // dropdown state
  const [value, setValue] = useState("departments");
  const [dropdown, setDropdown] = useState(false);
  const options = fields.filter((field) => field !== "amount");
  // add data to context
  useEffect(() => {
    expensesCtx.setExpense(data);
  }, [data, expensesCtx]);

  // sets value state according to selected option in dropdown
  useEffect(() => {
    if (options.includes(value)) {
      setDropdown(true);
    }
  }, [value, options]);

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
      {dropdown && <DropDown category={value} />}
    </div>
  );
}

export default Total;
