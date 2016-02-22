import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export const VOTE_WIDTH_PERCENT = 8;

export default class Tally extends Component {
    constructor(props) {
        super(props);

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    getPair() {
        return this.props.pair || [];
    }

    getVotes(entry) {
        if(this.props.tally && this.props.tally.has(entry)) {
            return this.props.tally.get(entry);
        }
        return 0;
    }

    getVotesBlockWidth(entry) {
        return (this.getVotes(entry) * VOTE_WIDTH_PERCENT) + '%';
    }

    render() {
        return (
            <div className="tally">
                {this.getPair().map(entry =>
                    <div key={entry} className="entry">
                        <h1>{entry}</h1>
                        <div className="voteVizualization">
                            <div className="votesBlock" style={{width: this.getVotesBlockWidth(entry)}}>
                            </div>
                        </div>
                        <div className="voteCount">
                            {this.getVotes(entry)}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
