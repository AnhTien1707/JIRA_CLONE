import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {store} from './store'
import { StyleProvider } from "@ant-design/cssinjs";
import {ToatsMessage} from "./module/ToatsMessage"
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
 <div>
  <Provider store={store}>
  <StyleProvider hashPriority="high">
    <ToatsMessage/>
    <App/>
   </StyleProvider>
  </Provider>
  
 </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
