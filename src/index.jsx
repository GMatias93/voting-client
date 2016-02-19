import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import App from './components/app';
import { VotingContainer } from './containers/voting';
import { ResultsContainer } from './containers/results';

const store = createStore(reducer);
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
    <Route path="/results" component={ResultsContainer} />
    <Route path="/" component={VotingContainer} />
    </Route>;

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>{routes}</Router>
    </Provider>,
    document.getElementById('app')
);
