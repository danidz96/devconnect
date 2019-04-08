import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './styles/App.css';
import store from './store';

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<div className="App">
					<Navbar />
					<Route exact path={'/'} component={Landing} />
					<div className="container">
						<Route exact path={'/register'} component={Register} />
						<Route exact path={'/login'} component={Login} />
					</div>
					<Footer />
				</div>
			</Router>
		</Provider>
	);
};

export default App;
