import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App component render', () => {
  const appComponent = render(<App />);
  it('Goto Posts button', () => {
    const button = screen.getByRole('button', {
      name: 'Goto Posts',
    });
    expect(button).toBeInTheDocument();
  });
});
