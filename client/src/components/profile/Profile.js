import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../actions/profileActions';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';

const Profile = (props) => {
	useEffect(() => {
		if (props.match.params.handle) {
			props.getProfileByHandle(props.match.params.handle);
		}
	}, []);

	const { profile, loading } = props;
	let profileContent;

	if (profile.profile === null || loading) {
		profileContent = <Spinner />;
	} else {
		profileContent = (
			<div>
				<div className="row">
					<div className="col-md-6">
						<Link to="/profiles" className="btn btn-light mb-3 float-left">
							Back To Profiles
						</Link>
					</div>
					<div className="col-md-6" />
				</div>
				<ProfileHeader profile={profile} />
				<ProfileAbout profile={profile} />
			</div>
		);
	}

	return (
		<div className="profile">
			<div className="container">
				<div className="row">
					<div className="col-md-12">{profileContent}</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	profile: state.profile
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
