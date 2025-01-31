import Spinner from './spinner';
import {render, screen} from '@testing-library/react';

describe('Component:  Spinner', () => {
  it('should render correctly', () => {
    const loadingPageDataTestId = 'loading-page-container';

    render(< Spinner/>);
    const loadingPageContainer = screen.getByTestId(loadingPageDataTestId);

    expect(loadingPageContainer).toBeInTheDocument();
  });
});
