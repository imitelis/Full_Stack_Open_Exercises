import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Filter from '../components/Filter';
import { filterChange } from '../reducers/filterReducer';

// Custom test renderer
const renderWithState = (initialState) => {
  const store = configureStore({
    reducer: {
      filter: () => '',
    },
    preloadedState: {
      filter: initialState.filter,
    },
  });

  return {
    store,
    renderUI: () => render(
      <Provider store={store}>
        <Filter />
      </Provider>
    ),
  };
};

describe('Filter', () => {
  it('should dispatch filterChange with the correct value when input changes', () => {
    const value = 'new filter value';

    const { store, renderUI } = renderWithState({ filter: '' });
    const spy = jest.spyOn(store, 'dispatch');

    renderUI();

    fireEvent.change(screen.getByRole('textbox'), { target: { value } });

    expect(spy).toHaveBeenCalledWith(filterChange(value));
  });

  it('should render input field', () => {
    const { renderUI } = renderWithState({ filter: '' });
  
    renderUI();
  
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });
});