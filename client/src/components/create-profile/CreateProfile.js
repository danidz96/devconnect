import React, { useState } from 'react';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';

const CreateProfile = () => {
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

	const onChange = (input) => {
		setProfile({ ...profile, [input.name]: input.value });
	};

	return (
		<div className="create-profile">
			<div className="container">
				<div className="row">
					<div className="col-md-8 m-auto">
						<a href="dashboard.html" className="btn btn-light">
							Go Back
						</a>
						<h1 className="display-4 text-center">Create Your Profile</h1>
						<p className="lead text-center">Let's get some information to make your profile stand out</p>
						<form action="add-experience.html">
							<div className="form-group">
								<input
									type="text"
									className="form-control form-control-lg"
									placeholder="* Profile handle"
									name="handle"
									value={profile.handle}
									onChange={(e) => onChange(e.target)}
									required
								/>
								<small className="form-text text-muted">
									A unique handle for your profile URL. Your full name, company name, nickname, etc
									(This CAN'T be changed later)
								</small>
							</div>
							<div className="form-group">
								<select className="form-control form-control-lg" name="status">
									<option value="0">* Select Professional Status</option>
									<option value="Developer">Developer</option>
									<option value="Junior Developer">Junior Developer</option>
									<option value="Senior Developer">Senior Developer</option>
									<option value="Manager">Manager</option>
									<option value="Student or Learning">Student or Learning</option>
									<option value="Instructor">Instructor or Teacher</option>
									<option value="Intern">Intern</option>
									<option value="Other">Other</option>
								</select>
								<small className="form-text text-muted">
									Give us an idea of where you are at in your career
								</small>
							</div>
							<div className="form-group">
								<TextFieldGroup
									type="text"
									className="form-control form-control-lg"
									placeholder="Company"
									name="company"
									value={profile.company}
									onChange={(e) => onChange(e.target)}
								/>
								<small className="form-text text-muted">
									Could be your own company or one you work for
								</small>
							</div>
							<div className="form-group">
								<TextFieldGroup
									type="text"
									className="form-control form-control-lg"
									placeholder="Website"
									name="website"
									value={profile.website}
									onChange={(e) => onChange(e.target)}
								/>
								<small className="form-text text-muted">Could be your own or a company website</small>
							</div>
							<div className="form-group">
								<TextFieldGroup
									type="text"
									className="form-control form-control-lg"
									placeholder="Location"
									name="location"
									value={profile.location}
									onChange={(e) => onChange(e.target)}
								/>
								<small className="form-text text-muted">City & state suggested (eg. Boston, MA)</small>
							</div>
							<div className="form-group">
								<TextFieldGroup
									type="text"
									className="form-control form-control-lg"
									placeholder="Skills"
									name="skills"
									value={profile.skills}
									onChange={(e) => onChange(e.target)}
								/>
								<small className="form-text text-muted">
									Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
								</small>
							</div>
							<div className="form-group">
								<TextFieldGroup
									type="text"
									className="form-control form-control-lg"
									placeholder="Github Username"
									name="githubusername"
									value={profile.githubusername}
									onChange={(e) => onChange(e.target)}
								/>
								<small className="form-text text-muted">
									If you want your latest repos and a Github link, include your username
								</small>
							</div>
							<div className="form-group">
								<textarea
									className="form-control form-control-lg"
									placeholder="A short bio of yourself"
									name="bio"
								/>
								<small className="form-text text-muted">Tell us a little about yourself</small>
							</div>

							<div className="mb-3">
								<button type="button" className="btn btn-light">
									Add Social Network Links
								</button>
								<span className="text-muted">Optional</span>
							</div>

							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<i className="fab fa-twitter" />
									</span>
								</div>
								<TextFieldGroup
									type="text"
									className="form-control form-control-lg"
									placeholder="Twitter Profile URL"
									name="twitter"
									value={profile.twitter}
									onChange={(e) => onChange(e.target)}
								/>
							</div>

							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<i className="fab fa-facebook" />
									</span>
								</div>
								<TextFieldGroup
									type="text"
									className="form-control form-control-lg"
									placeholder="Facebook Page URL"
									name="facebook"
									value={profile.facebook}
									onChange={(e) => onChange(e.target)}
								/>
							</div>

							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<i className="fab fa-linkedin" />
									</span>
								</div>
								<TextFieldGroup
									type="text"
									className="form-control form-control-lg"
									placeholder="Linkedin Profile URL"
									name="linkedin"
									value={profile.linkedin}
									onChange={(e) => onChange(e.target)}
								/>
							</div>

							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<i className="fab fa-youtube" />
									</span>
								</div>
								<TextFieldGroup
									type="text"
									className="form-control form-control-lg"
									placeholder="YouTube Channel URL"
									name="youtube"
									value={profile.youtube}
									onChange={(e) => onChange(e.target)}
								/>
							</div>

							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<i className="fab fa-instagram" />
									</span>
								</div>
								<TextFieldGroup
									type="text"
									className="form-control form-control-lg"
									placeholder="Instagram Page URL"
									name="instagram"
									value={profile.instagram}
									onChange={(e) => onChange(e.target)}
								/>
							</div>
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
