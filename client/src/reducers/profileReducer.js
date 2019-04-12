const initialState = {
	profile: null,
	profiles: null,
	loading: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case 'GET_PROFILE':
			return {
				...state,
				profile: action.payoad,
				loading: false
			};
		case 'PROFILE_LOADING':
			return {
				...state,
				loading: true
			};
		case 'PROFILE_NOT_FOUND':
			return state;
		case 'CLEAR_CURRENT_PROFILE':
			return state;
		case 'GET_PROFILES':
			return state;

		default:
			return state;
	}
};
