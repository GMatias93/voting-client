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

});
