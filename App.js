/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Provider } from 'react-redux';
import createStore from './src/createStore';
import Nav from './src/components/Nav';

const store = createStore();

export default function App() {
  return (
    <Provider store={store}>
      <Nav />
    </Provider>
  );
}
