import React, { Component } from 'react';
import { List, Map } from 'immutable';

const pair = List.of('Change Location', 'Plastic Bag');
const tally = Map({'Change Location': 43423, 'Plastic Bag': 4});

export default class App extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return React.cloneElement(this.props.children, {
            pair: pair,
            tally: tally
        });
    }
}
