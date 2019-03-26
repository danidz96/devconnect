import React, { useState } from 'react';

const Register = () => {
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ password2, setPassword2 ] = useState('');
	const onSubmit = (e) => {
		e.preventDefault();

		const newUser = {
			name,
			email,
			password,
			password2
		};

		console.log(newUser);
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
									className="form-control form-control-lg"
									placeholder="Name"
									name="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
							</div>
							<div className="form-group">
								<input
									type="email"
									className="form-control form-control-lg"
									placeholder="Email Address"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									name="email"
								/>
								<small className="form-text text-muted">
									This site uses Gravatar so if you want a profile image, use a Gravatar email
								</small>
							</div>
							<div className="form-group">
								<input
									type="password"
									className="form-control form-control-lg"
									placeholder="Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									name="password"
								/>
							</div>
							<div className="form-group">
								<input
									type="password"
									className="form-control form-control-lg"
									placeholder="Confirm Password"
									value={password2}
									onChange={(e) => setPassword2(e.target.value)}
									name="password2"
								/>
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
