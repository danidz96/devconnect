import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

const Login = (props) => {
	const [ values, setValues ] = useState({ email: '', password: '' });
	const [ errors, setErrors ] = useState({});

	useEffect(
		() => {
			if (props.auth.isAuthenticated) {
				props.history.push('/dashboard');
			}
			setErrors(props.errors);
		},
		[ props.errors, props.auth ]
	);

	const onChange = (input) => {
		setValues({ ...values, [input.name]: input.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const user = {
			...values
		};

		props.loginUser(user);
	};

	return (
		<div>
			<div className="login">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="display-4 text-center">Log In</h1>
							<p className="lead text-center">Sign in to your DevConnector account</p>
							<form onSubmit={onSubmit}>
								<div className="form-group">
									<input
										type="email"
										className={'form-control form-control-lg ' + (errors.email && 'is-invalid')}
										placeholder="Email Address"
										name="email"
										value={values.email}
										onChange={(e) => onChange(e.target)}
									/>
									{errors.email && <div className="invalid-feedback">{errors.email}</div>}
								</div>
								<div className="form-group">
									<input
										type="password"
										className={'form-control form-control-lg ' + (errors.password && 'is-invalid')}
										placeholder="Password"
										name="password"
										value={values.password}
										onChange={(e) => onChange(e.target)}
										autoComplete="password"
									/>
									{errors.password && <div className="invalid-feedback">{errors.password}</div>}
								</div>
								<input type="submit" className="btn btn-info btn-block mt-4" />
							</form>
						</div>
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

export default connect(mapStateToProps, { loginUser })(Login);
