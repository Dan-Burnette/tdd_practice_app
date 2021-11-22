import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditTodoForm from "./EditTodoForm";

describe("element rendering", () => {
  beforeEach(() => {
    const mockUpdateTodo = jest.fn();
    const mockDeleteTodo = jest.fn();
    const todo = { description: "do something", complete: false };
    render(
      <EditTodoForm
        todo={todo}
        toggleTodoCompletion={mockUpdateTodo}
        deleteTodo={mockDeleteTodo}
      />
    );
  });

  it("renders the form", () => {
    const formElement = screen.getByRole("form");
    expect(formElement).toBeInTheDocument();
  });

  it("renders the todo description", () => {
    const labelElement = screen.getByLabelText("do something");
    expect(labelElement).toBeInTheDocument();
  });

  it("renders the completion toggle", () => {
    const inputElement = screen.getByRole("checkbox");
    expect(inputElement).toBeInTheDocument();
  });

  it("renders the delete button", () => {
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });
});

describe("when the completion checkbox is toggled", () => {
  it("calls the toggleTodoCompletion function", () => {
    const mockUpdateTodo = jest.fn();
    const mockDeleteTodo = jest.fn();
    const todo = { description: "do something", complete: false };
    render(
      <EditTodoForm
        todo={todo}
        toggleTodoCompletion={mockUpdateTodo}
        deleteTodo={mockDeleteTodo}
      />
    );

    const checkboxElement = screen.getByRole("checkbox");
    userEvent.click(checkboxElement);

    expect(mockUpdateTodo.mock.calls.length).toEqual(1);
  });
});

describe("when the delete button is pressed", () => {
  it("calls the deleteTodo function", () => {
    const mockUpdateTodo = jest.fn();
    const mockDeleteTodo = jest.fn();
    const todo = { description: "do something", complete: false };
    render(
      <EditTodoForm
        todo={todo}
        toggleTodoCompletion={mockUpdateTodo}
        deleteTodo={mockDeleteTodo}
      />
    );

    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    expect(mockDeleteTodo.mock.calls.length).toEqual(1);
  });
});
