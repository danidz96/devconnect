import axios from 'axios';

export const addPost = (postData) => (dispatch) => {
	dispatch(clearErrors());
	axios
		.post('/api/posts', postData)
		.then((res) => dispatch({ type: 'ADD_POST', payload: res.data }))
		.catch((err) => dispatch({ type: 'GET_ERRORS', payload: err.response.data }));
};

// Clear errors
export const clearErrors = () => {
	return {
		type: 'CLEAR_ERRORS'
	};
};
