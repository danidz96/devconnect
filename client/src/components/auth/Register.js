import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
	const [ values, setValues ] = useState({ name: '', email: '', password: '', password2: '' });
	const [ errors, setErrors ] = useState({});

	const onChange = (input) => {
		setValues({ ...values, [input.name]: input.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const newUser = {
			...values
		};

		axios.post('/api/users/register', newUser).then((res) => console.log(res.data)).catch((err) => {
			setErrors(err.response.data);
		});
	};

	return (
		<div className="register">
			<div className="container">
				<div className="row">
					<div className="col-md-8 m-auto">
						<h1 className="display-4 text-center">Sign Up</h1>
						<p className="lead text-center">Create your DevConnector account</p>
						<form action="create-profile.html" onSubmit={onSubmit}>
							<div className="form-group">
								<input
									type="text"
									className={'form-control form-control-lg ' + (errors.name && 'is-invalid')}
									placeholder="Name"
									name="name"
									value={values.name}
									onChange={(e) => onChange(e.target)}
									required
								/>
								{errors.name && <div className="invalid-feedback">{errors.name}</div>}
							</div>
							<div className="form-group">
								<input
									type="email"
									className={'form-control form-control-lg ' + (errors.email && 'is-invalid')}
									placeholder="Email Address"
									value={values.email}
									onChange={(e) => onChange(e.target)}
									name="email"
								/>
								<small className="form-text text-muted">
									This site uses Gravatar so if you want a profile image, use a Gravatar email
								</small>
								{errors.email && <div className="invalid-feedback">{errors.email}</div>}
							</div>
							<div className="form-group">
								<input
									type="password"
									className={'form-control form-control-lg ' + (errors.password && 'is-invalid')}
									placeholder="Password"
									value={values.password}
									onChange={(e) => onChange(e.target)}
									name="password"
								/>
								{errors.password && <div className="invalid-feedback">{errors.password}</div>}
							</div>
							<div className="form-group">
								<input
									type="password"
									className={'form-control form-control-lg ' + (errors.password2 && 'is-invalid')}
									placeholder="Confirm Password"
									value={values.password2}
									onChange={(e) => onChange(e.target)}
									name="password2"
								/>
								{errors.password2 && <div className="invalid-feedback">{errors.password2}</div>}
							</div>
							<input type="submit" className="btn btn-info btn-block mt-4" />
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
