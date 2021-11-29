import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";

describe("element rendering", () => {
  it("renders the error alert message", () => {
    render(<ErrorMessage message={"test error message"} />);

    const errorElement = screen.getByRole("alert");
    expect(errorElement).toBeInTheDocument();
  });
});
