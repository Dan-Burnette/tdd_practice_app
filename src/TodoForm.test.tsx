import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoForm from "./TodoForm";

describe("element rendering", () => {
  beforeEach(() => {
    const mockCreateTodo = jest.fn();
    render(<TodoForm createTodo={mockCreateTodo} todos={[]} />);
  });

  it("renders the form", () => {
    const formElement = screen.getByRole("form");
    expect(formElement).toBeInTheDocument();
  });

  it("renders the new todo label", () => {
    const labelElement = screen.getByLabelText("New Todo");
    expect(labelElement).toBeInTheDocument();
  });

  it("renders the new todo input", () => {
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });
});

it("properly updates the input value", () => {
  const mockCreateTodo = jest.fn();
  render(<TodoForm createTodo={mockCreateTodo} todos={[]} />);

  const inputElement = screen.getByRole("textbox") as HTMLInputElement;
  const description = "test todo";
  userEvent.type(inputElement, description);

  expect(inputElement.value).toBe(description);
});

describe("form submission for a new todo", () => {
  it("calls the createTodo function", () => {
    const mockCreateTodo = jest.fn();
    render(<TodoForm createTodo={mockCreateTodo} todos={[]} />);

    const inputElement = screen.getByRole("textbox") as HTMLInputElement;
    userEvent.type(inputElement, "do something");
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    expect(mockCreateTodo.mock.calls.length).toEqual(1);
  });

  it("resets the input", () => {
    const mockCreateTodo = jest.fn();
    render(<TodoForm createTodo={mockCreateTodo} todos={[]} />);

    const inputElement = screen.getByRole("textbox") as HTMLInputElement;
    userEvent.type(inputElement, "do something");
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    expect(inputElement.value).toBe("");
  });

  it("does not display the errorMessage", () => {
    const mockCreateTodo = jest.fn();
    render(<TodoForm createTodo={mockCreateTodo} todos={[]} />);

    const inputElement = screen.getByRole("textbox") as HTMLInputElement;
    userEvent.type(inputElement, "do something");
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    const errorMessageElement = screen.queryByRole("alert");
    expect(errorMessageElement).not.toBeInTheDocument();
  });
});

describe("form submission for an empty todo", () => {
  it("does NOT call the createTodo function", () => {
    const mockCreateTodo = jest.fn();
    render(<TodoForm createTodo={mockCreateTodo} todos={[]} />);

    const inputElement = screen.getByRole("textbox") as HTMLInputElement;
    userEvent.type(inputElement, "");
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    expect(mockCreateTodo.mock.calls.length).toEqual(0);
  });

  it("displays a fitting error message", () => {
    const mockCreateTodo = jest.fn();
    render(<TodoForm createTodo={mockCreateTodo} todos={[]} />);

    const inputElement = screen.getByRole("textbox") as HTMLInputElement;
    userEvent.type(inputElement, "");
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    const errorMessageElement = screen.getByRole("alert");
    expect(errorMessageElement).toBeInTheDocument();
    expect(errorMessageElement.innerHTML).toContain(
      "Oops! You can't add a blank todo!"
    );
  });
});

describe("form submission for a duplicate new todo", () => {
  it("does NOT call the createTodo function", () => {
    const mockCreateTodo = jest.fn();
    render(
      <TodoForm
        createTodo={mockCreateTodo}
        todos={[{ description: "do something", complete: false }]}
      />
    );

    const inputElement = screen.getByRole("textbox") as HTMLInputElement;
    userEvent.type(inputElement, "do something");
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    expect(mockCreateTodo.mock.calls.length).toEqual(0);
  });

  it("displays a fitting error message", () => {
    const mockCreateTodo = jest.fn();
    render(
      <TodoForm
        createTodo={mockCreateTodo}
        todos={[{ description: "do something", complete: false }]}
      />
    );

    const inputElement = screen.getByRole("textbox") as HTMLInputElement;
    userEvent.type(inputElement, "do something");
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    const errorMessageElement = screen.getByRole("alert");
    expect(errorMessageElement).toBeInTheDocument();
    expect(errorMessageElement.innerHTML).toContain(
      "You've already added that todo to your list."
    );
  });
});
