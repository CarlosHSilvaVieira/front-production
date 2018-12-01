import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Operational from './pages/operacional'
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducers from './redux/reducers/index'

ReactDOM.render(<Provider store={createStore(reducers)}><Operational /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
