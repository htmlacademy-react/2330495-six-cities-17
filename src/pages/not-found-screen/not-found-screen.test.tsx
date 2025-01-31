import NotFoundScreen from './not-found-screen';
import { withHistory } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {

    const expectedNotFoundText = '404';
    const expectedLinkText = 'Вернуться на главную';

    render(withHistory(<NotFoundScreen />));

    expect(screen.getByText(expectedNotFoundText)).toBeInTheDocument();
    expect(screen.getByText(expectedLinkText)).toBeInTheDocument();
  });
});
