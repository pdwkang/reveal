import React, { Component } from 'react';
import './App.css';
import { Route, Switch} from 'react-router';
import Home from './Home';

class App extends Component {
	render() {
		return (
			<Switch>
				<Route exact path='/' component={Home}/>
			</Switch>
		);
	}
}

export default App;
