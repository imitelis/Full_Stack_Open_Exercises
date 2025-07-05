import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Todo from '../Todos/Todo';

describe('Todo component', () => {
  const mockDelete = jest.fn();
  const mockComplete = jest.fn();

  const todo = {
    text: 'Write tests',
    done: false,
  };

  test('Renders todo text', () => {
    render(<Todo todo={todo} deleteTodo={mockDelete} completeTodo={mockComplete} />);
    expect(screen.getByText('Write tests')).toBeInTheDocument();
  });

  test('Renders not done info when todo is not done', () => {
    render(<Todo todo={todo} deleteTodo={mockDelete} completeTodo={mockComplete} />);
    expect(screen.getByText(/This todo is not done/)).toBeInTheDocument();
    expect(screen.getByText(/Set as done/)).toBeInTheDocument();
  });

  test('Calls deleteTodo when Delete is clicked', () => {
    render(<Todo todo={todo} deleteTodo={mockDelete} completeTodo={mockComplete} />);
    fireEvent.click(screen.getByText('Delete'));
    expect(mockDelete).toHaveBeenCalledWith(todo);
  });

  test('Calls completeTodo when Set as done is clicked', () => {
    render(<Todo todo={todo} deleteTodo={mockDelete} completeTodo={mockComplete} />);
    fireEvent.click(screen.getByText('Set as done'));
    expect(mockComplete).toHaveBeenCalledWith(todo);
  });

  test('Renders done info when todo is done', () => {
    const doneTodo = { ...todo, done: true };
    render(<Todo todo={doneTodo} deleteTodo={mockDelete} completeTodo={mockComplete} />);
    expect(screen.getByText(/This todo is done/)).toBeInTheDocument();
    expect(screen.queryByText(/Set as done/)).not.toBeInTheDocument();
  });
});
