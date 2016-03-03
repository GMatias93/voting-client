import React, {
  Component
} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {
  connect
} from 'react-redux';
import Winner from '../components/winner';
import Tally from '../components/tally';
import * as actionCreators from '../action_creators';

export const Results = class extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      this.props.winner ?
      < Winner ref = "winner"
      winner = {
        this.props.winner
      }
      /> : < div className = "results" >
      < Tally pair = {
        this.props.pair
      }
      tally = {
        this.props.tally
      }
      /> < div className = "management" >
      < button ref = "restart"
				className="button"
      onClick = {
        this.props.restart
      } >
      Restart < /button> < button ref = "next"
      className = "button"
      onClick = {
        this.props.next
      } >
      Next < /button> < /div> < /div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    tally: state.getIn(['vote', 'tally']),
    winner: state.get('winner')
  };
}

export const ResultsContainer = connect(
  mapStateToProps,
  actionCreators
)(Results);
