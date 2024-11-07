import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import { worker } from './mocks/server';
import'./index.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";

// Запуск MSW worker для обработки моков API
worker.start();

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
