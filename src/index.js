import React from 'react';
import ReactDOM from 'react-dom';
import { compose, applyMiddleware, createStore } from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist'
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';

const store = createStore(
  reducers,
  undefined,
  compose(
    applyMiddleware(),
    autoRehydrate()
  )
)
persistStore(store)

ReactDOM.render((
    <Provider store={store}><App /></Provider>
), document.getElementById('root'));
registerServiceWorker();
