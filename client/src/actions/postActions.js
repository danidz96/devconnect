import axios from 'axios';

export const addPost = (postData) => (dispatch) => {
	dispatch(clearErrors());
	axios
		.post('/api/posts', postData)
		.then((res) => dispatch({ type: 'ADD_POST', payload: res.data }))
		.catch((err) => dispatch({ type: 'GET_ERRORS', payload: err.response.data }));
};

export const getPosts = (postData) => (dispatch) => {
	dispatch(setPostLoading());
	axios
		.get('/api/posts')
		.then((res) => dispatch({ type: 'GET_POSTS', payload: res.data }))
		.catch((err) => dispatch({ type: 'GET_POSTS', payload: null }));
};

export const deletePost = (id) => (dispatch) => {
	axios
		.delete(`/api/posts/${id}`)
		.then((res) => dispatch({ type: 'DELETE_POST', payload: id }))
		.catch((err) => dispatch({ type: 'GET_ERRORS', payload: err.response.data }));
};

export const setPostLoading = () => {
	return {
		type: 'POST_LOADING'
	};
};

// Clear errors
export const clearErrors = () => {
	return {
		type: 'CLEAR_ERRORS'
	};
};
