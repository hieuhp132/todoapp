import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';

import { createStore } from 'redux';
import rootReducer from './store/reducers';
import { Provider } from 'react-redux';

const store = createStore(rootReducer);

// ✅ This is the correct React 18+ way to render
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
