import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { deleteEducation } from '../../actions/profileActions';

const Education = (props) => {
	const onDeleteClick = (id) => {
		props.deleteEducation(id);
	};

	const education = props.educations.map((education) => (
		<tr key={education._id}>
			<td>{education.school}</td>
			<td>{education.degree}</td>
			<td>
				<Moment format="DD/MM/YYYY">{education.from}</Moment> -{' '}
				{education.to ? <Moment format="DD/MM/YYYY">{education.to}</Moment> : ' Current'}
			</td>
			<td>
				<button onClick={() => onDeleteClick(education._id)} className="btn btn-danger">
					Delete
				</button>
			</td>
		</tr>
	));
	return (
		<React.Fragment>
			<h4 className="mb-4">Education Credentials</h4>
			<table className="table">
				<thead>
					<tr>
						<th>School</th>
						<th>Degree</th>
						<th>Years</th>
						<th />
					</tr>
				</thead>
				<tbody>{education}</tbody>
			</table>
		</React.Fragment>
	);
};

export default connect(null, { deleteEducation })(withRouter(Education));
