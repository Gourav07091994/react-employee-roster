import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './App';

const mockStore = configureStore([]);
const store = mockStore({ employees: [] });

test('renders the Employee Roster heading', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const headingElement = screen.getByText(/Employee Roster/i);
  expect(headingElement).toBeInTheDocument();
});
