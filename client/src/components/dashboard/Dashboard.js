import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions';

const Dashboard = (props) => {
	useEffect(() => {
		console.log('dashboard mounted');
		props.getCurrentProfile();
	}, []);

	return (
		<React.Fragment>
			<h1>Dashboard</h1>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
