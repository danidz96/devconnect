import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';
import { getPosts } from '../../actions/postActions';
import PostFeed from './PostFeed';

const Posts = (props) => {
	useEffect(() => {
		props.getPosts();
	}, []);

	const { posts, loading } = props.post;
	let postContent;

	if (posts === null || loading) {
		postContent = <Spinner />;
	} else {
		postContent = <PostFeed posts={posts} />;
	}

	return (
		<div className="feed">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<PostForm />
						{postContent}
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
