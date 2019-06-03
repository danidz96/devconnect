import React from 'react';
import PostItem from './PostItem';

const PostFeed = (props) => {
	const { posts } = props;

	return posts.map((post) => <PostItem key={post._id} post={post} showActions={true} />);
};

export default PostFeed;
