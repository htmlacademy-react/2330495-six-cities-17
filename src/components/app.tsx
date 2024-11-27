
import WelcomeScreen from '../pages/welcome-screen/welcome-screen';

type AppScreenProps = {
  amountPlaces: number;
};

function App({ amountPlaces }: AppScreenProps): JSX.Element {
  return <WelcomeScreen amountPlaces={amountPlaces} />;
}

export default App;
