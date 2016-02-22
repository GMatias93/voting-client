import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';
import reducer from '../src/reducer';

describe('reducer', () => {

    it('handles SET_STATE', () => {
        const initialState = Map();
        const action = {
            type: 'SET_STATE',
            state: Map({
                vote: Map({
                    pair: List.of('Started From The Bottom', 'Too Much'),
                    tally: Map({ 'Started From The Bottom': 2 })
                })
            })
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Started From The Bottom', 'Too Much'],
                tally: { 'Started From The Bottom': 2 }
            }
        }));
    });

    it('handles SET_STATE with plain JS payload', () => {
        const initialState = Map();
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: ['Fireworks', 'Light Up'],
                    tally: { Fireworks: 43 }
                }
            }
        };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Fireworks', 'Light Up'],
                tally: { Fireworks: 43 }
            }
        }));
    });

    it('handles SET_STATE without initial state', () => {
        const action = {
            type: 'SET_STATE',
            state: {
                vote: {
                    pair: ['Shut It Down', 'Thank Me Now'],
                    tally: { 'Thank Me Now': 3 }
                }
            }
        };
        const nextState = reducer(undefined, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Shut It Down', 'Thank Me Now'],
                tally: { 'Thank Me Now': 3 }
            }
        }));
    });

    it('handles VOTE by setting hasVoted', () => {
        const state = fromJS({
            vote: {
                pair: ['Jumpman', 'Diamonds Dancing'],
                tally: { Jumpman: 43 }
            }
        });
        const action = { type: 'VOTE', entry:'Jumpman' };
        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Jumpman', 'Diamonds Dancing'],
                tally: { Jumpman: 43 }
            },
            hasVoted: 'Jumpman'
        }));

    });

    it('does not set hasVoted for VOTE of invalid entry', () => {
        const state = fromJS({
            vote: {
                pair: ['Jumpman', 'Diamonds Dancing'],
                tally: { Jumpman: 43 }
            }
        });
        const action = { type: 'VOTE', entry:'30 for 30 Freestyle' };
        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Jumpman', 'Diamonds Dancing'],
                tally: { Jumpman: 43 }
            }
        }));

    });

    it('removes hasVoted on SET_STATE if pair changes', () => {
        const state = fromJS({
            vote: {
                pair: ['Jumpman', 'Diamonds Dancing'],
                tally: { Jumpman: 43 }
            },
            hasVoted: 'Jumpman'
        });
        const action = { type: 'SET_STATE',
                         state:{
                             vote: {
                                 pair: ['Successful', 'Fear']
                             }
                         }
                       };
        const nextState = reducer(state, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Successful', 'Fear']
            }
        }));
    });

});
