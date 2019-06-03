import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPost } from '../../actions/postActions';
import Spinner from '../common/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';

const Post = (props) => {
	const { post, loading } = props.post;

	useEffect(() => {
		props.getPost(props.match.params.id);
	}, []);

	let postContent;

	if (post === null || loading || Object.keys(post).length === 0) {
		postContent = <Spinner />;
	} else {
		postContent = (
			<React.Fragment>
				<PostItem post={post} />
				<CommentForm postId={post._id} />
			</React.Fragment>
		);
	}

	return (
		<div>
			<div className="post">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<Link to="/feed" className="btn btn-light mb-3">
								Back To Feed
							</Link>
							{postContent}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
