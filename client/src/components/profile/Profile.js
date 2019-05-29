import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { getProfileByHandle } from '../../actions/profileActions';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';

const Profile = (props) => {
	const { profile, loading } = props.profile;

	useEffect(() => {
		if (props.match.params.handle) {
			props.getProfileByHandle(props.match.params.handle);
		}
	}, []);

	useEffect(
		() => {
			if (props.profile.profiles === null && loading) {
				props.history.push('/not-found');
			}
		},
		[ props.profile ]
	);

	let profileContent;

	if (profile === null || loading) {
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
				<ProfileCreds education={profile.education} experience={profile.experience} />
				{profile.githubusername ? <ProfileGithub username={profile.githubusername} /> : null}
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
