import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { voteAnecdote, deleteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import AnecdoteList from '../components/AnecdoteList';

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
    { id: 1, content: 'Anecdote 1', votes: 0 },
    { id: 2, content: 'Anecdote 2', votes: 5 },
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
        <AnecdoteList />
      </Provider>
    ),
  };
};

describe('AnecdoteList', () => {
  beforeEach(() => {
    voteAnecdote.mockClear();
    deleteAnecdote.mockClear();
    setNotification.mockClear();
  });

  it('should render anecdotes correctly', () => {
    const { renderUI } = renderWithState({ filter: '' });
    renderUI();

    expect(screen.getByText('Anecdote 1')).toBeInTheDocument();
    expect(screen.getByText('Anecdote 2')).toBeInTheDocument();
    expect(screen.getByText('has 5 votes')).toBeInTheDocument();
  });

  it('should display filtered anecdotes when filter is applied', () => {
    const { renderUI } = renderWithState({ filter: 'Anecdote 2' });
    renderUI();

    expect(screen.getByText('Anecdote 2')).toBeInTheDocument();
    expect(screen.queryByText('Anecdote 1')).toBeNull();
  });
});
