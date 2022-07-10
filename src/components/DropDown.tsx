import React, { useContext } from "react";

import { ExpensesContext } from "../store/expenses-context";
import helpers from "./util/util";

interface Props {
  category: string;
}

function DropDown({ category }: Props) {
  const expensesCtx = useContext(ExpensesContext);
  const values = helpers.getValues(category, expensesCtx.data);

  const totalAmounts: number[] = [];
  values?.map((value) => totalAmounts.push(value.result));
  const total = totalAmounts.reduce((a, b) => a + b, 0);

  return (
    <div className=" w-4/5">
      <div className="flex justify-between mt-10 border-b border-black">
        <h3 className="uppercase">{category}</h3>
        <h3 className="uppercase">Amount</h3>
      </div>
      {values?.map((d) => (
        <div key={d.key} className="flex justify-between">
          <p className=" my-2">{d.key}</p>
          <p className="my-2">{d.result}</p>
        </div>
      ))}
      <div className="flex justify-end mt-4">
        <span className=" mr-10 text-base font-bold">Total:</span>
        <span className="text-base font-bold ">{total}</span>
      </div>
    </div>
  );
}

export default DropDown;
