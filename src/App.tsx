import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { usePapaParse } from "react-papaparse";
import Table from "./components/Table";
import Total from "./components/Total";
import ExpensesContextProvider from "./store/expenses-context";

function App() {
  // State to store table Column name
  const [tableColumn, setTableColumn] = useState<{}[]>([]);

  // Really Had to use any type here due to papaparse
  // State to store the values
  const [values, setValues] = useState<any>();

  // State to store the fields
  const [fields, setFields] = useState<string[]>([]);
  const { readRemoteFile } = usePapaParse();

  useEffect(() => {
    readRemoteFile(
      "https://raw.githubusercontent.com/Pectus-Finance/hiring-exercises/master/frontend/expanses.csv",
      {
        download: true,
        header: true,
        complete: (results) => {
          const column: {}[] = [];
          setFields(results.meta.fields!);
          results.meta.fields?.map((d) => {
            return column.push({
              Header: d,
              accessor: d,
            });
          });
          setTableColumn(column);
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
        <Route
          path="/"
          element={<Table columns={tableColumn} data={values} />}
        />
        <Route
          path="/total"
          element={<Total data={values} fields={fields} />}
        />
      </Routes>
    </ExpensesContextProvider>
  );
}

export default App;
