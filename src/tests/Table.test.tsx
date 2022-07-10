/* eslint-disable react/react-in-jsx-scope */
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Table from "../components/Table";

const column = [
  {
    Header: "department",
    accessor: "IT",
  },
];

const data = [
  {
    departments: "IT",
    project_name: "Alpha",
    amount: "3,000",
    date: "2/3/2022",
    member_name: "Max",
  },
];

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Table Component test", () => {
  it("renders", async () => {
    render(
      <Router>
        <Table columns={column} data={data} />
      </Router>
    );

    expect(screen.getByTestId("content")).toBeInTheDocument();
  });

  it("goes to total when clicked", async () => {
    render(
      <Router>
        <Table columns={column} data={data} />
      </Router>
    );

    const button = screen.getByTestId("button");
    fireEvent.click(button);
    expect(mockedUsedNavigate).toBeCalledTimes(1);
  });
});
