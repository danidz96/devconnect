import React from 'react';

const TextAreaFieldGroup = ({ name, placeholder, value, error, onChange }) => {
	return (
		<div className="form-group">
			<textarea
				className={'form-control form-control-lg ' + (error && 'is-invalid')}
				placeholder={placeholder}
				name={name}
				value={value}
				onChange={onChange}
			/>
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

export default TextAreaFieldGroup;
