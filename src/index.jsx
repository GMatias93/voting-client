import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import App from './components/app';
import Voting from './components/voting';
import Results from './components/results';

const routes = <Route component={App}>
    <Route path="/results" component={Results} />
    <Route path="/" component={Voting} />
    </Route>;

ReactDOM.render(
    <Router history={hashHistory}>{routes}</Router>,
    document.getElementById('app')
);
