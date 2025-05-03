import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from '../reducers/notificationReducer';
import Notification from '../components/Notification';

// Custom test renderer
const renderWithState = (initialState) => {
  const store = configureStore({
    reducer: {
      notification: notificationReducer,
    },
    preloadedState: {
      notification: initialState.notification,
    },
  });

  return {
    store,
    renderUI: () =>
      render(
        <Provider store={store}>
          <Notification />
        </Provider>
      ),
  };
};

describe('Notification', () => {
  it('should not render anything when notification is an empty string', () => {
    const { renderUI } = renderWithState({ notification: '' });
    const { container } = renderUI();

    const div = container.querySelector('div');
    expect(div).toBeInTheDocument();
    expect(div.textContent).toBe('');
  });

  it('should render notification message when notification is non-empty', () => {
    const { renderUI } = renderWithState({ notification: 'Test Notification' });
    const { getByText } = renderUI();

    expect(getByText('Test Notification')).toBeInTheDocument();
  });
});
