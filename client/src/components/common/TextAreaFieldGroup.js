import React from 'react';

const TextAreaFieldGroup = ({ name, placeholder, value, label, error, info, type, onChange, disabled }) => {
	return (
		<div className="form-group">
			<input
				type={type}
				className={'form-control form-control-lg ' + (error && 'is-invalid')}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
				autoComplete={type}
				disabled={disabled}
			/>
			{info && <small className="form-text text-muted">{info}</small>}
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

export default TextAreaFieldGroup;
