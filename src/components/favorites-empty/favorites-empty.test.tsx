import FavoritiesEmpty from './favorites-empty';
import { render, screen } from '@testing-library/react';

describe('Component:  Spinner', () => {
  it('should render correctly', () => {
    const expectedText =
      /Save properties to narrow down search or plan your future trips./;

    render(<FavoritiesEmpty />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
