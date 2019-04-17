import React from 'react';

const SelectListGroup = ({ name, value, error, info, onChange, options }) => {
	return (
		<div className="form-group">
			<select
				className={'form-control form-control-lg ' + (error && 'is-invalid')}
				name={name}
				value={value}
				onChange={onChange}
			>
				{options.map((option) => (
					<option key={option.label} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			{info && <small className="form-text text-muted">{info}</small>}
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

export default SelectListGroup;
