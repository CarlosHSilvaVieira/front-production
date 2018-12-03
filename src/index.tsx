import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Operational from './pages/operacional'
import Tatico from './pages/tactical'
import * as serviceWorker from './serviceWorker';

import { BrowserRouter, Switch, Route  } from 'react-router-dom'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducers from './redux/reducers/index'

ReactDOM.render(<Provider store={createStore(reducers)}>
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Operational} />
            <Route path="/tatico" component={Tatico} />
        </Switch>
    </BrowserRouter>
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
