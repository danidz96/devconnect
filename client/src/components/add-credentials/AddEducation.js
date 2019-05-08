import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profileActions';

const AddEducation = (props) => {
	const initialEducation = {
		school: '',
		degree: '',
		fieldofstudy: '',
		from: '',
		to: '',
		current: false,
		description: '',
		errors: {},
		disabled: false
	};

	const [ education, setEducation ] = useState(initialEducation);

	useEffect(
		() => {
			setEducation({ ...education, errors: props.errors });
		},
		[ props.errors ]
	);

	const onSubmit = (e) => {
		e.preventDefault();

		const { errors, disabled, ...educationData } = education;

		props.AddEducation(educationData, props.history);
	};

	const onChange = (input) => {
		setEducation({ ...education, [input.name]: input.value });
	};

	const onChangeCheckbox = () => {
		setEducation({ ...education, current: !education.current, disabled: !education.disabled });
	};

	return (
		<div className="add-education">
			<div className="container">
				<div className="row">
					<div className="col-md-8 m-auto">
						<Link to="/dashboard" className="btn btn-light">
							Go Back
						</Link>
						<h1 className="display-4 text-center">Add Education</h1>
						<p className="lead text-center">Add any school, bootcamp... That you attended</p>
						<form onSubmit={onSubmit}>
							<TextFieldGroup
								placeholder="School:*"
								name="school"
								type="text"
								value={education.school}
								onChange={(e) => onChange(e.target)}
								error={education.errors.school}
							/>
							<TextFieldGroup
								placeholder="Degree:*"
								name="degree"
								type="text"
								value={education.degree}
								onChange={(e) => onChange(e.target)}
								error={education.errors.degree}
							/>
							<TextFieldGroup
								placeholder="Field of Study:"
								name="fieldofstudy"
								type="text"
								value={education.fieldofstudy}
								onChange={(e) => onChange(e.target)}
								error={education.errors.fieldofstudy}
							/>
							<h6>From Date</h6>
							<TextFieldGroup
								name="from"
								type="date"
								value={education.from}
								onChange={(e) => onChange(e.target)}
								error={education.errors.from}
							/>
							<h6>To Date</h6>
							<TextFieldGroup
								name="to"
								type="date"
								value={education.to}
								onChange={(e) => onChange(e.target)}
								errors={education.errors.to}
								disabled={education.disabled && 'disabled'}
							/>
							<div className="form-check mb-4">
								<input
									type="checkbox"
									name="current"
									className="form-check-input"
									checked={education.current}
									onChange={(e) => onChangeCheckbox()}
									id="current"
								/>
								<label htmlFor="current" className="form-check-label">
									Current Program
								</label>
							</div>
							<TextAreaFieldGroup
								placeholder="
                Program Description"
								name="description"
								value={education.description}
								onChange={(e) => onChange(e.target)}
								error={education.errors.description}
								info="Tell us about the program"
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

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation));
