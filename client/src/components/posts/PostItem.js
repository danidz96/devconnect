import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/postActions';

const PostItem = (props) => {
	const { post, auth, showActions } = props;

	const onDeleteClick = (id) => {
		props.deletePost(id);
	};

	const onLikeClick = (id) => {
		props.addLike(id);
	};

	const onUnlikeClick = (id) => {
		props.removeLike(id);
	};

	const findUserLike = (likes) => {
		const { auth } = props;
		if (likes.filter((like) => like.user === auth.user.id).length > 0) {
			return true;
		} else {
			return false;
		}
	};

	return (
		<div className="card card-body mb-3">
			<div className="row">
				<div className="col-md-2">
					<a href="profile.html">
						<img className="rounded-circle d-none d-md-block" src={post.avatar} alt="" />
					</a>
					<br />
					<p className="text-center">{post.name}</p>
				</div>
				<div className="col-md-10">
					<p className="lead">{post.text}</p>
					<span>
						<button onClick={() => onLikeClick(post._id)} type="button" className="btn btn-light mr-1">
							<i className={`fas fa-thumbs-up ${findUserLike(post.likes) && 'text-info'}`} />
							<span className="badge">{post.likes.length}</span>
						</button>
						<button onClick={() => onUnlikeClick(post._id)} type="button" className="btn btn-light mr-1">
							<i className="text-secondary fas fa-thumbs-down" />
						</button>
						<Link to={`/post/${post._id}`} className="btn btn-info mr-1">
							Comments
						</Link>
						{post.user === auth.user.id ? (
							<button
								onClick={() => onDeleteClick(post._id)}
								type="button"
								className="btn btn-danger mr-1"
							>
								<i className="fas fa-times" />
							</button>
						) : null}
					</span>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem);
