import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

// Register User
export const registerUser = (userData) => (dispatch) => {
	axios.post('/api/users/register', userData).then((res) => console.log(res.data)).catch((err) =>
		dispatch({
			type: 'GET_ERRORS',
			payload: err.response.data
		})
	);
};

// Login - Get User Token
export const loginUser = (userData) => (dispatch) => {
	axios
		.post('/api/users/login', userData)
		.then((res) => {
			// Save to localStorage
			const { token } = res.data;
			// Set token to ls
			localStorage.setItem('jwtToken', token);
			// Set token to Auth Header
			setAuthToken(token);
			// Decode token to get user data
			const decoded = jwt_decode(token);
			// Set current user
			dispatch(setCurrentUser(decoded));
		})
		.catch((err) =>
			dispatch({
				type: 'GET_ERRORS',
				payload: err.response.data
			})
		);
};

// Set logged in user
export const setCurrentUser = (decoded) => {
	return {
		type: 'SET_CURRENT_USER',
		payload: decoded
	};
};

// Log User out

export const logoutUser = () => (dispatch) => {
	// Remove token from localstorage
	localStorage.removeItem('jwtToken');

	//Remove auth header for future requests
	setAuthToken(null);

	// Set current user to {} which will set isAuthenticated to false
	dispatch(setCurrentUser({}));
};
