/* eslint-disable react/react-in-jsx-scope */
import { render, screen, fireEvent } from "@testing-library/react";
import helpers from "../components/util/util";

import Total from "../components/Total";

const data = [
  {
    departments: "IT",
    project_name: "Alpha",
    amount: "3,000",
    date: "2/3/2022",
    member_name: "Max",
  },
];

const fields = ["departments", "Member_name"];

describe("Total Component Test", () => {
  it("renders", () => {
    helpers.getValues = jest
      .fn()
      .mockReturnValue([{ key: "IT", result: 3000 }]);
    render(<Total fields={fields} data={data} />);

    expect(screen.getByTestId("totalcontent")).toBeInTheDocument();
  });
});
