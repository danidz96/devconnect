import axios from 'axios';

export const addPost = (postData) => (dispatch) => {
	axios
		.post('/api/posts', postData)
		.then((res) => dispatch({ type: 'ADD_POST', payload: res.data }))
		.catch((err) => dispatch({ type: 'GET_ERRORS', payload: err.response.data }));
};
