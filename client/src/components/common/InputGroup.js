import React from 'react';

const InputGroup = ({ name, type, icon, placeholder, value, error, onChange }) => {
	return (
		<div className="input-group mb-3">
			<div className="input-group-prepend">
				<span className="input-group-text">
					<i className={icon} />
				</span>
			</div>
			<input
				className={'form-control form-control-lg ' + (error && 'is-invalid')}
				placeholder={placeholder}
				name={name}
				type={type}
				value={value}
				onChange={onChange}
			/>
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

export default InputGroup;
