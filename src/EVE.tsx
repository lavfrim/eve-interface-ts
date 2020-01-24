import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux';
import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';
import './style/EVE.scss';


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Header />
      <Main  />
      <Footer />
    </Provider>
  );
}

export default App;
