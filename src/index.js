import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom"
import memoryUtils from '../src/utils/memoryUtils'
import storageUtils from '../src/utils/storageUtils'

import App from './App';
const user = storageUtils.getUser();
memoryUtils.user = user;


ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  ,
  document.getElementById('root')
);


