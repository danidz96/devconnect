import React, { useState } from 'react';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addComment } from '../../actions/postActions';

const CommentForm = (props) => {
	const [ comment, setComment ] = useState({ text: '' });

	const onChange = (input) => {
		setComment({ ...comment, [input.name]: input.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const { user } = props.auth;
		const { postId } = props;

		const newComment = {
			...comment,
			name: user.name,
			avatar: user.avatar
		};
		props.addComment(postId, newComment);
		setComment({ text: '' });
	};

	return (
		<div className="post-form mb-3">
			<div className="card card-info">
				<div className="card-header bg-info text-white">Make a comment...</div>
				<div className="card-body">
					<form onSubmit={onSubmit}>
						<div className="form-group">
							<TextAreaFieldGroup
								placeholder="Reply to post"
								name="text"
								value={comment.text}
								onChange={(e) => onChange(e.target)}
								error={props.errors.text}
							/>
						</div>
						<button type="submit" className="btn btn-dark">
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { addComment })(CommentForm);
