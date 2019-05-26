import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../actions/profileActions';

const Profile = (props) => {
	useEffect(() => {
		if (props.match.params.handle) {
			props.getProfileByHandle(props.match.params.handle);
		}
	}, []);

	return <div>Profile</div>;
};

const mapStateToProps = (state) => ({
	profile: state.profile
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
