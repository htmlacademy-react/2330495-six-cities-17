import './spinner.css';

function Spinner(): JSX.Element {
  return (
    <div className="spinner-container" data-testid='loading-page-container'>
      <div className="spinner"></div>
    </div>
  );
}

export default Spinner;
