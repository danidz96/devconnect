import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/isEmpty';

const EditProfile = (props) => {
	const initialProfile = {
		displaySocialInputs: false,
		handle: '',
		company: '',
		website: '',
		location: '',
		status: '',
		skills: '',
		githubusername: '',
		bio: '',
		twitter: '',
		facebook: '',
		linkedin: '',
		youtube: '',
		instagram: '',
		errors: {}
	};

	const [ profile, setProfile ] = useState(initialProfile);

	useEffect(
		() => {
			setProfile({ ...profile, errors: props.errors });
		},
		[ props.errors ]
	);

	useEffect(() => {
		props.getCurrentProfile();
	}, []);

	useEffect(
		() => {
			const profile = props.profile.profile;
			if (profile) {
				profile.skills.join(',');
				profile.company = !isEmpty(profile.company) ? profile.company : '';
				profile.website = !isEmpty(profile.website) ? profile.website : '';
				profile.location = !isEmpty(profile.location) ? profile.location : '';
				profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
				profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
				profile.social = !isEmpty(profile.social) ? profile.social : {};
				profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
				profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
				profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';
				profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
				profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';

				setProfile({ ...profile, errors: props.errors });
			}
		},
		[ props.profile.profile ]
	);

	// Select options for status
	const options = [
		{ label: '* Select Professional Status', value: 0 },
		{ label: 'Developer', value: 'Developer' },
		{ label: 'Junior Developer', value: 'Junior Developer' },
		{ label: 'Senior Developer', value: 'Senior Developer' },
		{ label: 'Manager', value: 'Manager' },
		{ label: 'Student or Learning', value: 'Student or Learning' },
		{ label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
		{ label: 'Intern', value: 'Intern' },
		{ label: 'Other', value: 'Other' }
	];

	const onChange = (input) => {
		setProfile({ ...profile, [input.name]: input.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const { errors, displaySocialInputs, ...profileData } = profile;

		props.createProfile(profileData, props.history);
	};

	let socialInputs;

	if (profile.displaySocialInputs) {
		socialInputs = (
			<div>
				<InputGroup
					placeholder="Twitter Profile URL"
					name="twitter"
					icon="fab fa-twitter"
					value={profile.twitter}
					onChange={(e) => onChange(e.target)}
					error={profile.errors.twitter}
				/>

				<InputGroup
					placeholder="Facebook Page URL"
					name="facebook"
					icon="fab fa-facebook"
					value={profile.facebook}
					onChange={(e) => onChange(e.target)}
					error={profile.errors.facebook}
				/>

				<InputGroup
					placeholder="Linkedin Profile URL"
					name="linkedin"
					icon="fab fa-linkedin"
					value={profile.linkedin}
					onChange={(e) => onChange(e.target)}
					error={profile.errors.linkedin}
				/>

				<InputGroup
					placeholder="YouTube Channel URL"
					name="youtube"
					icon="fab fa-youtube"
					value={profile.youtube}
					onChange={(e) => onChange(e.target)}
					error={profile.errors.youtube}
				/>

				<InputGroup
					placeholder="Instagram Page URL"
					name="instagram"
					icon="fab fa-instagram"
					value={profile.instagram}
					onChange={(e) => onChange(e.target)}
					error={profile.errors.instagram}
				/>
			</div>
		);
	}

	return (
		<div className="create-profile">
			<div className="container">
				<div className="row">
					<div className="col-md-8 m-auto">
						<Link to="/dashboard" className="btn btn-light">
							Go Back
						</Link>
						<h1 className="display-4 text-center">Edit Your Profile</h1>
						<p className="lead text-center">Let's get some information to make your profile stand out</p>
						<form onSubmit={onSubmit}>
							<TextFieldGroup
								placeholder="* Profile Handle"
								name="handle"
								value={profile.handle}
								onChange={(e) => onChange(e.target)}
								error={profile.errors.handle}
								info="A unique handle for your profile URL. Your full name, company name, nickname"
							/>
							<SelectListGroup
								placeholder="Status"
								name="status"
								value={profile.status}
								onChange={(e) => onChange(e.target)}
								options={options}
								error={profile.errors.status}
								info="Give us an idea of where you are at in your career"
							/>
							<TextFieldGroup
								placeholder="Company"
								name="company"
								value={profile.company}
								onChange={(e) => onChange(e.target)}
								error={profile.errors.company}
								info="Could be your own company or one you work for"
							/>
							<TextFieldGroup
								placeholder="Website"
								name="website"
								value={profile.website}
								onChange={(e) => onChange(e.target)}
								error={profile.errors.website}
								info="Could be your own website or a company one"
							/>
							<TextFieldGroup
								placeholder="Location"
								name="location"
								value={profile.location}
								onChange={(e) => onChange(e.target)}
								error={profile.errors.location}
								info="City or city & state suggested (eg. Boston, MA)"
							/>
							<TextFieldGroup
								placeholder="* Skills"
								name="skills"
								value={profile.skills}
								onChange={(e) => onChange(e.target)}
								error={profile.errors.skills}
								info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
							/>
							<TextFieldGroup
								placeholder="Github Username"
								name="githubusername"
								value={profile.githubusername}
								onChange={(e) => onChange(e.target)}
								error={profile.errors.githubusername}
								info="If you want your latest repos and a Github link, include your username"
							/>
							<TextAreaFieldGroup
								placeholder="Short Bio"
								name="bio"
								value={profile.bio}
								onChange={(e) => onChange(e.target)}
								error={profile.errors.bio}
								info="Tell us a little about yourself"
							/>

							<div className="mb-3">
								<button
									type="button"
									onClick={() => {
										setProfile({ ...profile, displaySocialInputs: !profile.displaySocialInputs });
									}}
									className="btn btn-light"
								>
									Add Social Network Links
								</button>
								<span className="text-muted">Optional</span>
							</div>
							{socialInputs}
							<input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	errors: state.errors,
	profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));
