import React, { useState } from 'react';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';

const CreateProfile = (props) => {
	const [ profile, setProfile ] = useState({
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
	});
	// const [ displaySocialInputs, setDisplaySocialInputs ] = useState(false);

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

		const profileData = {
			handle: profile.handle,
			company: profile.company,
			website: profile.website,
			location: profile.location,
			status: profile.status,
			skills: profile.skills,
			githubusername: profile.githubusername,
			bio: profile.bio,
			twitter: profile.twitter,
			facebook: profile.facebook,
			linkedin: profile.linkedin,
			youtube: profile.youtube,
			instagram: profile.instagram
		};

		console.log(profileData);
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
						<h1 className="display-4 text-center">Create Your Profile</h1>
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

export default connect(mapStateToProps)(CreateProfile);
