import React, { createContext, useReducer, useMemo } from "react";

import { Expense } from "../types/model";

export type GlobalContent = {
  data: Expense[] | {}[];
  setExpense: (data: Expense[]) => void;
};

export const ExpensesContext = createContext<GlobalContent>({
  data: [{}],
  setExpense: (data: Expense[]) => {},
});

const initialState = [{}];
type Action = {
  type: string;
  payload: Expense[];
};
function expensesReducer(state: Expense[] | {}[], action: Action) {
  switch (action.type) {
    case "SET":
      return action.payload;
    default:
      return state;
  }
}

type Props = {
  children?: React.ReactNode;
};

function ExpensesContextProvider({ children }: Props) {
  const [expenseState, dispatch] = useReducer(expensesReducer, initialState);

  function setExpense(data: Expense[]) {
    dispatch({ type: "SET", payload: data });
  }

  //   const value = {
  //     data: expenseState,
  //     setExpense,
  //   };

  const value = useMemo(
    () => ({
      data: expenseState,
      setExpense,
    }),
    [expenseState]
  );

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
