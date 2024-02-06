import { PaperProvider } from 'react-native-paper';
import RootNavigation from './src/navigation/RootNavigation';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

export default function App() {

  return (
    <Provider store={store}>
      <PaperProvider>
        <RootNavigation />
      </PaperProvider>
    </Provider>
  );
}

