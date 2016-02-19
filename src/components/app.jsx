import React, { Component } from 'react';
import { List } from 'immutable';

const pair = List.of('Change Location', 'Plastic Bag');

export default class App extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return React.cloneElement(this.props.children, {pair: pair});
    }
}
