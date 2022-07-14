import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { usePapaParse } from "react-papaparse";
import Table from "./components/Table";
import Total from "./components/Total";
import ExpensesContextProvider from "./store/expenses-context";

function App() {
  // State to store table Column name
  // const [tableColumn, setTableColumn] = useState<{}[]>([]);

  // Really Had to use any type here due to papaparse
  // State to store the values
  const [values, setValues] = useState<any>();

  // State to store the fields
  const [fields, setFields] = useState<string[]>([]);
  const { readRemoteFile } = usePapaParse();

  // fetch the csv data and store in different states
  useEffect(() => {
    readRemoteFile(
      "https://raw.githubusercontent.com/Pectus-Finance/hiring-exercises/master/frontend/expanses.csv",
      {
        download: true,
        header: true,
        complete: (results) => {
          setFields(results.meta.fields!);

          setValues(results.data);
        },
      }
    );
  }, [readRemoteFile]);

  if (!values) {
    return <div>Loading</div>;
  }

  return (
    <ExpensesContextProvider>
      <Routes>
        <Route path="/" element={<Table columns={fields} data={values} />} />
        <Route
          path="/total"
          element={<Total data={values} fields={fields} />}
        />
      </Routes>
    </ExpensesContextProvider>
  );
}

export default App;
