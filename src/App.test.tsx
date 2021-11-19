import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import App from './App';

describe('element rendering', () => {

  beforeEach(() => {
    const props = { todos: [] }
    render(<App {...props}/>);
  });

  it('renders the application header', () => {
    const headerElement = screen.getByText('Todo Application');
    expect(headerElement).toBeInTheDocument();
  });

  it('renders the todo form', () => {
    const formElement = screen.getByRole('form');
    expect(formElement).toBeInTheDocument();
  });

});

describe('when todos are present', () => {

  it('renders the todos', () => {
    const todos = [
      { description: "do that thing", complete: false },
      { description: "do that other thing", complete: false }
    ];
    const props = {todos: todos}

    render(<App {...props} />);

    todos.forEach(todo => {
      const todoElement = screen.getByText(todo.description);
      expect(todoElement).toBeInTheDocument();
    });
  });

});

it('creates a todo properly', () => {
  const props = { todos: [] }
  render(<App {...props}/>);

  const todoInputElement = screen.getByRole('textbox');
  userEvent.type(todoInputElement, 'do something');

  const createTodoButtonElement = screen.getByRole('button')
  userEvent.click(createTodoButtonElement);

  const todoListElement = screen.getByRole('list');
  const todoElements = todoListElement.children;


  expect(todoElements.length).toBe(1);

  console.log("todoElements are", todoElements);
  expect(todoElements.item(0).text).toBe('do something');
});



