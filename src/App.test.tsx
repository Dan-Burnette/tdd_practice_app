import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

it('renders the application header', () => {
  const props = { todos: [] }
  render(<App {...props}/>);

  const headerElement = screen.getByText('Todo Application');
  expect(headerElement).toBeInTheDocument();
});

it('renders the todo form', () => {
  const props = { todos: [] }
  render(<App {...props} />);

  const formElement = screen.getByRole('form');
  expect(formElement).toBeInTheDocument();
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

it('creates a todo properly when the submit button is clicked', () => {
  expect(true).toBe(false)
});



