import React, { Component } from 'react';
import Winner from './winner.jsx';
import Vote from './vote.jsx';

export default class Voting extends Component {
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

