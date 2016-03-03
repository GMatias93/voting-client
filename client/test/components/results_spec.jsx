import React from 'react/addons';
import ReactDOM from 'react-dom';
import {
  List,
  Map
} from 'immutable';
import {
  Results
} from '../../src/containers/results.jsx';
import {
  expect
} from 'chai';

const {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate
} = React.addons.TestUtils;

describe('Results', () => {

  it('renders entries with vote counts or zero', () => {
    const pair = List.of('Find Your Love', 'From Time');
    const tally = Map({
      'From Time': 9
    });
    const component = renderIntoDocument( < Results pair = {
        pair
      }
      tally = {
        tally
      }
      />
    );
    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
    const [TML, NWTS] = entries.map(e => e.textContent);

    expect(entries.length).to.equal(2);
    expect(TML).to.contain('Find Your Love');
    expect(TML).to.contain('0');
    expect(NWTS).to.contain('From Time');
    expect(NWTS).to.contain('9');
  });

  it('invokes the next callback when the next button is clicked', () => {
    let nextInvoked = true;
    const next = () => nextInvoked = true;

    const pair = List.of('Tuscan Leather', 'Pound Cake');
    const component = renderIntoDocument( < Results pair = {
        pair
      }
      tally = {
        Map()
      }
      next = {
        next
      }
      />
    );
    Simulate.click(ReactDOM.findDOMNode(component.refs.next));

    expect(nextInvoked).to.equal(true);
  });

	it('invokes action callback when restart button is clicked', () => {
		let restartInvoked = false;
		const pair = List.of('FML', 'Real Friends');
		const component = renderIntoDocument(
			<Results pair={pair}
							 tally={Map()}
							 restart={() => restartInvoked = true}/>
				);
		Simulate.click(ReactDOM.findDOMNode(component.refs.restart));

		expect(restartInvoked).to.equal(true);
	});

  it('it should render a winner when there is one', () => {
    const component = renderIntoDocument( < Results winner = {
        'Connect'
      }
      pair = {
        List.of('Connect', 'The Language')
      }
      tally = {
        Map()
      }
      />
    );
    const winner = ReactDOM.findDOMNode(component.refs.winner);

    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Connect');

  });

});
