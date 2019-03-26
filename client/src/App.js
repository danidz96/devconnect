import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import './styles/App.css';

const App = () => {
	return (
		<Router>
			<div className="App">
				<Navbar />
				<Route exact path={'/'} component={Landing} />
				<Footer />
			</div>
		</Router>
	);
};

export default App;
