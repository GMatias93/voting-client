import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import Winner from '../components/winner.jsx';
import Vote from '../components/vote.jsx';

export const Voting = class extends Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this); 
    }

    render() {
        return (
            <div>
              {this.props.winner ?
                  <Winner ref="winner" winner={this.props.winner} /> :
                  <Vote {...this.props} />}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        pair: state.getIn(['vote', 'pair']),
        winner: state.get('winner')
    };
}

export const VotingContainer = connect(mapStateToProps)(Voting);

