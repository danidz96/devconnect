import React, { useState } from 'react';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';

const PostForm = (props) => {
	const [ post, setPost ] = useState({ text: '' });

	const onChange = (input) => {
		setPost({ ...post, [input.name]: input.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const { user } = props.auth;

		const newPost = {
			...post,
			name: user.name,
			avatar: user.avatar
		};
		props.addPost(newPost);
		setPost({ text: '' });
	};

	return (
		<div>
			<div className="post-form mb-3">
				<div className="card card-info">
					<div className="card-header bg-info text-white">Say Something...</div>
					<div className="card-body">
						<form onSubmit={onSubmit}>
							<div className="form-group">
								<TextAreaFieldGroup
									placeholder="Create a post"
									name="text"
									value={post.text}
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
		</div>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { addPost })(PostForm);
