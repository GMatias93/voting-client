import {
  List,
  Map
} from 'immutable';
import {
  expect
} from 'chai';
import {
  setEntries,
  next,
  vote,
  restart
} from '../src/core';

describe('Application logic', () => {
  describe('setEntries', () => {

    it('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of('Trainspotting', '28 Days Later');
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting', '28 Days Later'),
        initialEntries: List.of('Trainspotting', '28 Days Later')
      }));

    });

    it('converts to immutable', () => {
      const state = Map();
      const entries = ['Trainspotting', '28 Days Later'];
      const nextState = setEntries(state, entries);

      expect(nextState).to.equal(Map({
        entries: List.of('Trainspotting', '28 Days Later'),
        initialEntries: List.of('Trainspotting', '28 Days Later')
      }));

    });

  });

	describe('restart', () => {

		it('returns to the initialEntries and takes the first two entries under vote', () => {
			const state = Map({
				vote: Map({
					round: 1,
					pair: List.of('Waves', 'Pt.2')
				}),
				entries: List(),
				initialEntries: List.of('Waves', 'Ultralight Beam', 'Pt.2')
			});
			const nextState = restart(state);

			expect(nextState).to.equal(Map({
				vote: Map({
					round: 2,
					pair: List.of('Waves', 'Ultralight Beam')
				}),
				entries: List.of('Pt.2'),
				initialEntries: List.of('Waves', 'Ultralight Beam', 'Pt.2')
			}));

		});

	});

  describe('next', () => {

    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          round: 1,
          pair: List.of('Trainspotting', '28 Days Later')
        }),
        entries: List.of('Sunshine')
      }));
    });

    it('puts winner of current vote back to entries', () => {
      const state = Map({
        vote: Map({
          round: 1,
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            Trainspotting: 4,
            '28 Days Later': 2
          })
        }),
        entries: List.of('Sunshine', 'Millions', '127 Hours')
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          round: 2,
          pair: List.of('Sunshine', 'Millions')
        }),
        entries: List.of('127 Hours', 'Trainspotting')
      }));

    });

    it('puts both from tied vote back to entries', () => {

      const state = Map({
        vote: Map({
          round: 1,
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            Trainspotting: 3,
            '28 Days Later': 3
          })
        }),
        entries: List.of('Sunshine', 'Millions', '127 Hours')
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        vote: Map({
          round: 2,
          pair: List.of('Sunshine', 'Millions')
        }),
        entries: List.of('127 Hours', 'Trainspotting', '28 Days Later')
      }));

    });

    it('marks winner when there is just one entry left', () => {
      const state = Map({
        vote: Map({
          round: 1,
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            Trainspotting: 4,
            '28 Days Later': 2
          })
        }),
        entries: List()
      });
      const nextState = next(state);

      expect(nextState).to.equal(Map({
        winner: 'Trainspotting'
      }));

    });

  });

  describe('vote', () => {

    it('creates a tally for the voted entry', () => {
      const state = Map({
        round: 1,
        pair: List.of('Trainspotting', '28 Days Later')

      });
      const nextState = vote(state, 'Trainspotting', 'voter1');

      expect(nextState).to.equal(Map({
        round: 1,
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          Trainspotting: 1
        }),
        votes: Map({
          voter1: 'Trainspotting'
        })

      }));

    });

    it('adds to existing tally for the voted entry', () => {
      const state = Map({
        round: 1,
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          Trainspotting: 3,
          '28 Days Later': 2
        }),
        votes: Map()

      });
      const nextState = vote(state, 'Trainspotting', 'voter1');

      expect(nextState).to.equal(Map({
        round: 1,
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          Trainspotting: 4,
          '28 Days Later': 2
        }),
        votes: Map({
          voter1: 'Trainspotting'
        })

      }));

    });

    it('nullifies previous vote for the same voter', () => {
      const state = Map({
        round: 1,
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          Trainspotting: 3,
          '28 Days Later': 2
        }),
        votes: Map({
          voter1: 'Trainspotting'
        })

      });
      const nextState = vote(state, '28 Days Later', 'voter1');

      expect(nextState).to.equal(Map({
        round: 1,
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          Trainspotting: 2,
          '28 Days Later': 3
        }),
        votes: Map({
          voter1: '28 Days Later'
        })

      }));

    });

    it('prevents user from voting on entries not included in current pair', () => {
      const state = Map({
        round: 1,
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          Trainspotting: 3,
          '28 Days Later': 43
        })
      });
      const nextState = vote(state, 'Take Care', 'voter1');

      expect(nextState).to.equal(Map({
        round: 1,
        pair: List.of('Trainspotting', '28 Days Later'),
        tally: Map({
          Trainspotting: 3,
          '28 Days Later': 43
        })
      }));
    });

  });

});
