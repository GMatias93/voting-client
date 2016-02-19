import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Winner from './winner';
import Tally from './tally';

export default class Results extends Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            this.props.winner ?
            <Winner ref="winner" winner={this.props.winner} /> :
            <div className="results">
                <Tally pair={this.props.pair} tally={this.props.tally} />
                <div className="management">
                    <button ref="next"
                            className="next"
                            onClick={this.props.next}>
                        Next
                    </button>
                </div>
            </div>
        );
    }
}
