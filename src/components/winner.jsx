import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class Winner extends Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className="winner">
                The winner is {this.props.winner}!
            </div>
        );
    }
}
