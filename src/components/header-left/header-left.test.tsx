import HeaderLeft from './header-left';
import { withHistory } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';

describe('Component: HeaderLeft', () => {
  it('should render correctly', () => {

    const expectedAltText = '6 cities logo';
    const preparedComponent = withHistory(<HeaderLeft />);

    render(preparedComponent);

    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
  });
});
