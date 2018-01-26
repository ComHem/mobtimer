import React from 'react';
import ReactDOM from 'react-dom';
import {compose, applyMiddleware, createStore} from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist'
import {Provider} from 'react-redux';
import './index.css';
import App from './components/App/App';
import reducers from './redux/reducers';

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(
        applyMiddleware(),
        autoRehydrate()
    )
);
persistStore(store);

ReactDOM.render((
    <Provider store={store}><App/></Provider>
), document.getElementById('root'));
