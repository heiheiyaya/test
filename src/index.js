import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom"
import memoryUtils from '../src/utils/memoryUtils'
import storageUtils from '../src/utils/storageUtils'
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
const user = storageUtils.getUser();
memoryUtils.user = user;


ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  ,
  document.getElementById('root')
);


