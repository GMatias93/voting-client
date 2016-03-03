import React, {
  Component
} from 'react';
import {
  ConnectionStateContainer
} from '../containers/connectionState';

export default class App extends Component {
  constructor(props) {
    super(props);

  }

  render() {
			return (
					<div>
						<ConnectionStateContainer />
						{this.props.children}
					</div>
    );
  }
}
