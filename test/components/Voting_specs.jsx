import React from 'react/addons';
import Voting from '../../src/components/voting';
import { expect } from 'chai';

const { renderIntoDocument, scryRenderedDOMComponentsWithTag } = React.addons.TestUtils;

describe('Voting', () => {

    it('renders a pair of buttons', () => {
        const component = renderIntoDocument(
            <Voting pair={["The Motto", "You and The 6"]} />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons.length).to.equal(2);
        expect(buttons[0].textContent).to.equal("The Motto");
        expect(buttons[1].textContent).to.equal("You and The 6");
    });

});
