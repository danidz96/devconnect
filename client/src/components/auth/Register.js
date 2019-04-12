import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

const Register = (props) => {
	const [ values, setValues ] = useState({ name: '', email: '', password: '', password2: '' });
	const [ errors, setErrors ] = useState({});

	const onChange = (input) => {
		setValues({ ...values, [input.name]: input.value });
	};

	useEffect(
		() => {
			if (props.auth.isAuthenticated) {
				props.history.push('/dashboard');
			}
			setErrors(props.errors);
		},
		[ props.errors, props.auth ]
	);

	const onSubmit = (e) => {
		e.preventDefault();

		const newUser = {
			...values
		};
		props.registerUser(newUser);
	};

	return (
		<div className="register">
			<div className="container">
				<div className="row">
					<div className="col-md-8 m-auto">
						<h1 className="display-4 text-center">Sign Up</h1>
						<p className="lead text-center">Create your DevConnector account</p>
						<form action="create-profile.html" onSubmit={onSubmit}>
							<TextFieldGroup
								placeholder="Name"
								name="name"
								type="text"
								value={values.name}
								onChange={(e) => onChange(e.target)}
								error={errors.name}
							/>
							<TextFieldGroup
								placeholder="Email"
								name="email"
								type="email"
								value={values.email}
								onChange={(e) => onChange(e.target)}
								error={errors.email}
								info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
							/>
							<TextFieldGroup
								placeholder="Password"
								name="password"
								type="password"
								value={values.password}
								onChange={(e) => onChange(e.target)}
								error={errors.password}
							/>
							<TextFieldGroup
								placeholder="Repeat password"
								name="password2"
								type="password"
								value={values.password2}
								onChange={(e) => onChange(e.target)}
								error={errors.password2}
							/>
							<input type="submit" className="btn btn-info btn-block mt-4" />
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(Register);
