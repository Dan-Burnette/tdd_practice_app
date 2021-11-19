import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import TodoForm from './TodoForm';

describe('element rendering', () => {

  beforeEach(() => {
    const mockCreateTodo = jest.fn();
    render(<TodoForm createTodo={mockCreateTodo}/>);
  });

  it('renders the form', () => {
    const formElement = screen.getByRole('form');
    expect(formElement).toBeInTheDocument();
  });

  it('renders the new todo label', () => {
    const labelElement = screen.getByLabelText('New Todo');
    expect(labelElement).toBeInTheDocument();
  });

  it('renders the new todo input', () => {
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeInTheDocument();
  });

  it('renders the submit button', () => {
    const buttonElement = screen.getByRole('button')
    expect(buttonElement).toBeInTheDocument();
  });

});

it('properly updates the input value', () => {
  const mockCreateTodo = jest.fn();
  render(<TodoForm createTodo={mockCreateTodo}/>);

  const inputElement = screen.getByRole('textbox') as HTMLInputElement;
  const description = 'test todo';
  userEvent.type(inputElement, description);

  expect(inputElement.value).toBe(description);
});

it('calls the createTodo function when the submit button is clicked', () => {
  const mockCreateTodo = jest.fn();
  render(<TodoForm createTodo={mockCreateTodo}/>);

  const buttonElement = screen.getByRole('button')
  userEvent.click(buttonElement);

  expect(mockCreateTodo.mock.calls.length).toEqual(1);
});
