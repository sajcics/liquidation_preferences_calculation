import React, { Component, Fragment } from 'react';
import './App.css';
import {LiquidationCalculation} from './containers/LiquidationCalculation';
import {BeautyHeader} from './components/BeautyHeader';

class App extends Component {

	render() {
		return (
			<Fragment>
				<BeautyHeader />
				<LiquidationCalculation />
			</Fragment>
		);
	}

}

export default App;