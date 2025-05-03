import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { voteAnecdote, deleteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import AnecdoteForm from '../components/AnecdoteForm';

// Mock reducers
jest.mock('../reducers/anecdoteReducer', () => ({
  voteAnecdote: jest.fn(),
  deleteAnecdote: jest.fn(),
}));

jest.mock('../reducers/notificationReducer', () => ({
  setNotification: jest.fn(),
}));

// Dummy state
const mockState = {
  anecdotes: [
  ],
  filter: '',
};

// Custom test renderer
const renderWithState = (initialState) => {
  const store = configureStore({
    reducer: {
      anecdotes: (state = mockState.anecdotes) => state,
      filter: (state = initialState.filter) => state,
    },
    preloadedState: {
      anecdotes: mockState.anecdotes,
      filter: initialState.filter,
    },
  });

  return {
    store,
    renderUI: () => render(
      <Provider store={store}>
        <AnecdoteForm />
      </Provider>
    ),
  };
};

describe('AnecdoteForm', () => {
  beforeEach(() => {
    voteAnecdote.mockClear();
    deleteAnecdote.mockClear();
    setNotification.mockClear();
  });

  it('should render anecdote form correctly', () => {
    const { renderUI } = renderWithState({ filter: '' });
    renderUI();

    expect(screen.getByText('Create a new')).toBeInTheDocument();
    expect(screen.getByText('content:')).toBeInTheDocument();
  });

  it('should handle form content correctly', () => {
    const { renderUI } = renderWithState({ filter: '' });
    renderUI();

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'This is a test' } });

    expect(input.value).toBe('This is a test');
  });
});