import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/common/PrivateRoute';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import './styles/App.css';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import NotFound from './components/not-found/NotFound';
import store from './store';

// Check for token
if (localStorage.jwtToken) {
	// Set auth token header auth
	setAuthToken(localStorage.jwtToken);
	// Decode token and get user info and exp
	const decoded = jwt_decode(localStorage.jwtToken);
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));

	// Check for expired token
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logoutUser());

		// Redirect to login
		window.location.href = '/login';
	}
}

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
						<Route exact path={'/profiles'} component={Profiles} />
						<Route exact path={'/profile/:handle'} component={Profile} />
						<Switch>
							<PrivateRoute exact path="/dashboard" component={Dashboard} />
							<PrivateRoute exact path="/create-profile" component={CreateProfile} />
							<PrivateRoute exact path="/edit-profile" component={EditProfile} />
							<PrivateRoute exact path="/add-experience" component={AddExperience} />
							<PrivateRoute exact path="/add-education" component={AddEducation} />
							<PrivateRoute exact path="/feed" component={Posts} />
						</Switch>
						<Route exact path={'/not-found'} component={NotFound} />
					</div>
					<Footer />
				</div>
			</Router>
		</Provider>
	);
};

export default App;
