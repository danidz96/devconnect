import axios from 'axios';

// Get current profile
export const getCurrentProfile = () => (dispatch) => {
	dispatch(setProfileLoading);
	axios
		.get('/api/profile/')
		.then((res) =>
			dispatch({
				type: 'GET_PROFILE',
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: 'GET_PROFILE',
				payload: {}
			})
		);
};

// Create profile
export const createProfile = (profileData, history) => (dispatch) => {
	axios.post('/api/profile', profileData).then((res) => history.push('/dashboard')).catch((err) =>
		dispatch({
			type: 'GET_ERRORS',
			payload: err.response.data
		})
	);
};

// Loading profile
export const setProfileLoading = () => {
	return {
		type: 'PROFILE_LOADING'
	};
};

// Clear current profile
export const clearCurrentProfile = () => {
	return {
		type: 'CLEAR_CURRENT_PROFILE'
	};
};

// Add experience
export const addExperience = (experienceData, history) => (dispatch) => {
	axios.post('/api/profile/experience', experienceData).then((res) => history.push('/dashboard')).catch((err) =>
		dispatch({
			type: 'GET_ERRORS',
			payload: err.response.data
		})
	);
};

// Delete account and profile
export const deleteAccount = () => (dispatch) => {
	if (window.confirm('Are you sure? This can NOT be undone!')) {
		axios
			.delete('/api/profile')
			.then((res) =>
				dispatch({
					type: 'SET_CURRENT_USER',
					payload: {}
				})
			)
			.catch((err) =>
				dispatch({
					type: 'GET_ERRORS',
					payload: err.response.data
				})
			);
	}
};
