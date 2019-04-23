import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profileActions';

const AddExperience = (props) => {
	const initialExperience = {
		company: '',
		title: '',
		location: '',
		from: '',
		to: '',
		current: false,
		description: '',
		errors: {},
		disabled: false
	};

	const [ experience, setExperience ] = useState(initialExperience);

	useEffect(
		() => {
			setExperience({ ...experience, errors: props.errors });
		},
		[ props.errors ]
	);

	const onSubmit = (e) => {
		e.preventDefault();

		const { errors, disabled, ...experienceData } = experience;

		props.addExperience(experienceData, props.history);
	};

	const onChange = (input) => {
		setExperience({ ...experience, [input.name]: input.value });
	};

	const onChangeCheckbox = () => {
		setExperience({ ...experience, current: !experience.current, disabled: !experience.disabled });
	};

	return (
		<div className="add-experience">
			<div className="container">
				<div className="row">
					<div className="col-md-8 m-auto">
						<Link to="/dashboard" className="btn btn-light">
							Go Back
						</Link>
						<h1 className="display-4 text-center">Add Experience</h1>
						<p className="lead text-center">
							Add any job or position that you have had in the past or current
						</p>
						<form onSubmit={onSubmit}>
							<TextFieldGroup
								placeholder="Company:*"
								name="company"
								type="text"
								value={experience.company}
								onChange={(e) => onChange(e.target)}
								error={experience.errors.company}
							/>
							<TextFieldGroup
								placeholder="Job Title:*"
								name="title"
								type="text"
								value={experience.title}
								onChange={(e) => onChange(e.target)}
								error={experience.errors.title}
							/>
							<TextFieldGroup
								placeholder="Location:"
								name="location"
								type="text"
								value={experience.location}
								onChange={(e) => onChange(e.target)}
								error={experience.errors.location}
							/>
							<h6>From Date</h6>
							<TextFieldGroup
								name="from"
								type="date"
								value={experience.from}
								onChange={(e) => onChange(e.target)}
								error={experience.errors.from}
							/>
							<h6>To Date</h6>
							<TextFieldGroup
								name="to"
								type="date"
								value={experience.to}
								onChange={(e) => onChange(e.target)}
								errors={experience.errors.to}
								disabled={experience.disabled && 'disabled'}
							/>
							<div className="form-check mb-4">
								<input
									type="checkbox"
									name="current"
									className="form-check-input"
									checked={experience.current}
									onChange={(e) => onChangeCheckbox()}
									id="current"
								/>
								<label htmlFor="current" className="form-check-label">
									Current Job
								</label>
							</div>
							<TextAreaFieldGroup
								placeholder="Job Description"
								name="description"
								value={experience.descriptio}
								onChange={(e) => onChange(e.target)}
								error={experience.errors.description}
								info="Tell us about the position"
							/>
							<input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(mapStateToProps, { addExperience })(withRouter(AddExperience));
