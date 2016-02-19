import React from 'react/addons';
import { List, Map } from 'immutable';
import Results from '../../src/components/results.jsx';
import { expect } from 'chai';

const { renderIntoDocument, scryRenderedDOMComponentsWithClass } = React.addons.TestUtils;

describe('Results', () => {

    it('renders entries with vote counts or zero', () => {
        const pair = List.of('Find Your Love', 'From Time');
        const tally = Map({'From Time': 9});
        const component = renderIntoDocument(
            <Results pair={pair} tally={tally} />
        );
        const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
        const [TML, NWTS] = entries.map(e => e.textContent);

        expect(entries.length).to.equal(2);
        expect(TML).to.contain('Find Your Love');
        expect(TML).to.contain('0');
        expect(NWTS).to.contain('From Time');
        expect(NWTS).to.contain('9');
    });

});
