import React, { Component } from 'react';

export default class Winner extends Component {
    render() {
        return (
            <div className="winner">
                The winner is {this.props.winner}!
            </div>
        );
    }
}
