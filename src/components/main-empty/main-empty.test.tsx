import MainEmptyScreen from './main-empty';
import { render, screen } from '@testing-library/react';
import { Town } from '../../const';

describe('Component:  Spinner', () => {
  it('should render correctly', () => {
    const expectedText =
      /We could not find any property available at the moment in/i;

    render(<MainEmptyScreen currentCity={Town.Paris} />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
