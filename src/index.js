import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './components/App';
import { Provider } from "react-redux";
import { createStore } from "redux";

const tabItem = 'cycle';

// function action(state = like, action) {
//   if (action.type === "increase") {
//     state++;
//     return state;
//   } else if (action.type === "decrease") {
//     state--;
//     return state;
//   } else {
//     return state;
//   }
// }

function action(state = tabItem, action) {
  return action.payload;
}

let store = createStore(action);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    < App />
  </Provider>
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);
