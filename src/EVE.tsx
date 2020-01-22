import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux';
import Header from './components/header';
import Main from './components/main'


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Header />
      <Main  />
    </Provider>
  );
}

export default App;
