/* eslint-disable react/react-in-jsx-scope */
import { render, screen } from "@testing-library/react";
import helpers from "../components/util/util";

import DropDown from "../components/DropDown";

describe("DropDown Component Test", () => {
  it("renders departments total", () => {
    helpers.getValues = jest
      .fn()
      .mockReturnValue([{ key: "IT", result: 3000 }]);
    render(<DropDown category="departments" />);
    expect(screen.getByText("IT")).toBeInTheDocument();
  });

  it("renders member_name total", () => {
    helpers.getValues = jest
      .fn()
      .mockReturnValue([{ key: "Sam", result: 3000 }]);
    render(<DropDown category="member_name" />);
    expect(screen.getByText("Sam")).toBeInTheDocument();
  });

  it("renders date total", () => {
    helpers.getValues = jest
      .fn()
      .mockReturnValue([{ key: "3/8/2021", result: 3000 }]);
    render(<DropDown category="date" />);
    expect(screen.getByText("3/8/2021")).toBeInTheDocument();
  });

  it("renders project_name total", () => {
    helpers.getValues = jest
      .fn()
      .mockReturnValue([{ key: "Gaama", result: 3000 }]);
    render(<DropDown category="project_name" />);
    expect(screen.getByText("Gaama")).toBeInTheDocument();
  });
});
