import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { creatStore } from 'redux';
import { Provide } from 'react-redux';
import reducer from './reducer';
import App from './components/app';
import Voting from './components/voting';
import Results from './components/results';

const store = creatStore(reducer);
store.dispatch({
    type: 'SET_STATE',
    state: {
        vote: {
            pair: ['Ceces Interlude', 'Karaoke'],
            tally: { Karaoke: 6 }
        }
    }
});

const routes = <Route component={App}>
    <Route path="/results" component={Results} />
    <Route path="/" component={Voting} />
    </Route>;

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>{routes}</Router>
    </Provider>,
    document.getElementById('app')
);
