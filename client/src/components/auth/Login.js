import React, { useState } from 'react';

const Login = () => {
	const [ values, setValues ] = useState({ email: '', password: '' });

	const onChange = (input) => {
		setValues({ ...values, [input.name]: input.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const user = {
			...values
		};

		console.log(user);
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
										className="form-control form-control-lg"
										placeholder="Email Address"
										name="email"
										value={values.name}
										onChange={(e) => onChange(e.target)}
									/>
								</div>
								<div className="form-group">
									<input
										type="password"
										className="form-control form-control-lg"
										placeholder="Password"
										name="password"
										value={values.name}
										onChange={(e) => onChange(e.target)}
										autoComplete="password"
									/>
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

export default Login;
