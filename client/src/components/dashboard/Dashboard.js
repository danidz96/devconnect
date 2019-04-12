import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profileActions';
import Spinner from '../common/Spinner';

const Dashboard = (props) => {
	useEffect(() => {
		console.log('dashboard mounted');
		props.getCurrentProfile();
	}, []);

	const { user } = props.auth;
	const { profile, loading } = props.profile;

	let dashboardContent;

	if (profile === null || loading) {
		dashboardContent = <Spinner />;
	} else {
		// Check if login user has profile data
		if (Object.keys(profile).length > 0) {
			dashboardContent = <h4>TODO: Display profile</h4>;
		} else {
			// User is logged in but has no profile
			dashboardContent = (
				<React.Fragment>
					<p className="lead text-muted">Welcome {user.name}</p>
					<p>You have not a profile, please add some info</p>
					<Link to="/create-profile" className="btn btn-lg btn-info">
						Create Profile
					</Link>
				</React.Fragment>
			);
		}
	}

	return (
		<div className="dashboard">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h1 className="display-4">Dashboard</h1>
						{dashboardContent}
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
