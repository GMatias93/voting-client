import {
  List,
  Map
} from 'immutable';

export function setEntries(state, entries) {
  // const immutableEntries = fromJS(entries, (key, value) => {
  //   return value.toList();
  // });
  // return state.set('entries', immutableEntries);

  return state.set('entries', List(entries));
}

function getWinners(vote) {
  if (!vote) {
    return [];
  }

  const [a, b] = vote.get('pair');
  const aVote = vote.getIn(['tally', a], 0);
  const bVote = vote.getIn(['tally', b], 0);

  if (aVote > bVote) {
    return [a];
  } else if (bVote > aVote) {
    return [b];
  } else {
    return [a, b];
  }
}

export function next(state) {
  const entries = state.get('entries')
    .concat(getWinners(state.get('vote')));

  if (entries.size === 1) {
    return state.remove('vote')
      .remove('entries')
      .set('winner', entries.first());
  } else {
    return state.merge({
      vote: Map({
				round: state.getIn(['vote', 'round'], 0) + 1,
        pair: entries.take(2)
      }),
      entries: entries.skip(2)
    });
  }
}

function removePreviousVote(voteState, voter) {
	const previousVote = voteState.getIn(['votes', voter]);
	if(previousVote) {
		return voteState.updateIn(['tally', previousVote], t => t - 1)
			.removeIn(['votes', voter]);
	}
	return voteState;
};

function addVote(voteState, entry, voter) {
	if(voteState.get('pair').includes(entry)) {
		return voteState.updateIn(['tally', entry], 0, t => t + 1)
			.setIn(['votes', voter], entry);
	}
	return voteState;
};

export function vote(voteState, entry, user) {
	return addVote(removePreviousVote(voteState, user), entry, user);
}

export const INITIAL_STATE = Map();
