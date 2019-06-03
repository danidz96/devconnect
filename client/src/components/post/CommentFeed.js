import React from 'react';
import CommentItem from './CommentItem';

const CommentFeed = (props) => {
	const { comments, postId } = props;

	return comments.map((comment) => <CommentItem key={comment._id} comment={comment} postId={postId} />);
};

export default CommentFeed;
