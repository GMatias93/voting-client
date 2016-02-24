import { expect } from 'chai';
import { List, Map } from 'immutable';

describe('Immutability', () => {
  describe('A Number', () => {
    function increment(currentState) {
      return currentState + 1;
    }

    it('Is immutable', () => {
      let state = 42;
      let nextState = increment(state);

      expect(nextState).to.equal(43);
      expect(state).to.equal(42);
    });

  });

  describe('A List', () => {

    function addMovie(currentState, movie) {
      return currentState.push(movie);
    }

    it('Is immutable', () => {
      let state = List.of('Trainspotting', '28 Days Later');
      let nextState = addMovie(state, 'Sunshine');

      expect(nextState).to.equal(List.of(
        'Trainspotting',
        '28 Days Later',
        'Sunshine'
      ));
      expect(state).to.equal(List.of(
        'Trainspotting',
        '28 Days Later'
      ));
    });

  });

  describe('A Tree', () => {

    function addMovie(currentState, movie) {
      // return currentState.set(
      //   'movies',
      //   currentState.get('movies').push(movie)
      // );

      // Does the same as above
      return currentState.update('movies', movies => movies.push(movie));
    }

    it('Is immutable', () => {
      let state = Map({
        movies: List.of('Trainspotting', '28 Days Later'),
      });
      let nextState = addMovie(state, 'Sunshine');

      expect(nextState).to.equal(Map({
        movies: List.of(
          'Trainspotting',
          '28 Days Later',
          'Sunshine'
        ),
      }));
      expect(state).to.equal(Map({
        movies: List.of(
          'Trainspotting',
          '28 Days Later'
        ),
      }));
    });

  });

});
