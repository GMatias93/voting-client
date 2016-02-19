import React from 'react/addons';
import ReactDOM from 'react-dom';
import Voting from '../../src/components/voting';
import { expect } from 'chai';

const { renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate } = React.addons.TestUtils;

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

    it('invokes callback when a button is clicked', () => {
        let votedWith;
        const vote = (entry) => votedWith = entry;

        const component = renderIntoDocument(
            <Voting pair={['Marvins Room', 'Underground Kings']}
            vote={vote} />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        Simulate.click(buttons[0]);

        expect(votedWith).to.equal('Marvins Room');
    });

    it('disables buttons when user has voted', () => {
        const component = renderIntoDocument(
            <Voting pair={['Lord know', 'Best I Ever Had']}
            hasVoted='Best I Ever Had' />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons.length).to.equal(2);
        expect(buttons[0].hasAttribute('disabled')).to.equal(true);
        expect(buttons[1].hasAttribute('disabled')).to.equal(true);
    });

    it('adds label to the voted entry', () => {
        const component = renderIntoDocument(
            <Voting pair={['6 Man', 'The Real Her']}
            hasVoted='The Real Her' />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons[1].textContent).to.contain('Voted');
    });

    it('renders just the winner when there is one', () => {
        const component = renderIntoDocument(
            <Voting winner={'Digital Dash'} />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        expect(buttons.length).to.equal(0);

        const winner = ReactDOM.findDOMNode(component.refs.winner);
        expect(winner).to.be.ok;
        expect(winner.textContent).to.contain('Digital Dash');

    });

});
