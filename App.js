/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Provider } from 'react-redux';
import HomeScreen from './src/components/HomeScreen';
import createStore from './src/createStore';

const store = createStore();

export default function App() {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
}
