import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/voting';

const pair = ['Hotline Bling', 'Shot For Me'];

ReactDOM.render(
    <Voting pair={pair} />,
    document.getElementById('app')
);
