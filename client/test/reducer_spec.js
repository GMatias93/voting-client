import {
  List,
  Map,
  fromJS
} from 'immutable';
import {
  expect
} from 'chai';
import reducer from '../src/reducer';

describe('reducer', () => {

	it('handles SET_CLIENT_ID', () => {
		const initialState = Map({});
		const action = {
			type: 'SET_CLIENT_ID',
			clientId: '1234'
		};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			clientId: '1234'
		}));
	});

  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('Started From The Bottom', 'Too Much'),
          tally: Map({
            'Started From The Bottom': 2
          })
        })
      })
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Started From The Bottom', 'Too Much'],
        tally: {
          'Started From The Bottom': 2
        }
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
          tally: {
            Fireworks: 43
          }
        }
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Fireworks', 'Light Up'],
        tally: {
          Fireworks: 43
        }
      }
    }));
  });

  it('handles SET_STATE without initial state', () => {
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Shut It Down', 'Thank Me Now'],
          tally: {
            'Thank Me Now': 3
          }
        }
      }
    };
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Shut It Down', 'Thank Me Now'],
        tally: {
          'Thank Me Now': 3
        }
      }
    }));
  });

  it('handles VOTE by setting myVote', () => {
    const state = fromJS({
      vote: {
				round: 30,
        pair: ['Jumpman', 'Diamonds Dancing'],
        tally: {
          Jumpman: 43
        }
      }
    });
    const action = {
      type: 'VOTE',
      entry: 'Jumpman'
    };
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
				round: 30,
        pair: ['Jumpman', 'Diamonds Dancing'],
        tally: {
          Jumpman: 43
        }
      },
      myVote: {
				round: 30,
				entry: 'Jumpman'
			}
    }));

  });

  it('does not set myVote for VOTE of invalid entry', () => {
    const state = fromJS({
      vote: {
				round: 30,
        pair: ['Jumpman', 'Diamonds Dancing'],
        tally: {
          Jumpman: 43
        }
      }
    });
    const action = {
      type: 'VOTE',
      entry: '30 for 30 Freestyle'
    };
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
				round: 30,
        pair: ['Jumpman', 'Diamonds Dancing'],
        tally: {
          Jumpman: 43
        }
      }
    }));

  });

  it('removes myVote on SET_STATE if round has changed', () => {
    const state = fromJS({
      vote: {
				round: 30,
        pair: ['Jumpman', 'Diamonds Dancing'],
        tally: {
          Jumpman: 43
        }
      },
      myVote: {
				round: 30,
				entry: 'Jumpman'
			}
    });
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
					round: 31,
          pair: ['Successful', 'Fear']
        }
      }
    };
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
				round: 31,
        pair: ['Successful', 'Fear']
      }
    }));
  });

});
