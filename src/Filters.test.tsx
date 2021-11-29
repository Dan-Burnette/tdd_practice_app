import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Filters from "./Filters";

describe("element rendering", () => {
  beforeEach(() => {
    const mockSetFilterParams = jest.fn();
    const params = { description: "", complete: false };
    render(<Filters params={params} setFilterParams={mockSetFilterParams} />);
  });

  it("renders the filter by description label", () => {
    const labelElement = screen.getByLabelText("Filter by description");
    expect(labelElement).toBeInTheDocument();
  });

  it("renders the filter by description input", () => {
    const inputElement = screen.getByRole("textbox", {
      name: "Filter by description",
    });
    expect(inputElement).toBeInTheDocument();
  });

  it("renders the filter by completion label", () => {
    const labelElement = screen.getByLabelText("Filter by completion");
    expect(labelElement).toBeInTheDocument();
  });

  it("renders the filter by completion input", () => {
    const checkboxElement = screen.getByRole("checkbox", {
      name: "Filter by completion",
    });
    expect(checkboxElement).toBeInTheDocument();
  });
});
