import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Experience = (props) => {
	const experience = props.experiences.map((experience) => (
		<tr key={experience._id}>
			<td>{experience.company}</td>
			<td>{experience.title}</td>
			<td>
				<Moment format="DD/MM/YYYY">{experience.from}</Moment> -{' '}
				{experience.to ? <Moment format="DD/MM/YYYY">{experience.to}</Moment> : ' Current'}
			</td>
			<td>
				<button className="btn btn-danger">Delete</button>
			</td>
		</tr>
	));
	return (
		<React.Fragment>
			<h4 className="mb-4">Experience Credentials</h4>
			<table className="table">
				<thead>
					<tr>
						<th>Company</th>
						<th>Title</th>
						<th>Years</th>
						<th />
					</tr>
				</thead>
				<tbody>{experience}</tbody>
			</table>
		</React.Fragment>
	);
};

export default connect(null)(withRouter(Experience));
