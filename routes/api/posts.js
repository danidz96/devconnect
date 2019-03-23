const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require('../../models/Post');
const User = require('../../models/User');
const validatePostInput = require('../../validation/post');

// @route   GET api/posts/test
router.get('/test', (req, res) => res.json({ msg: 'post work' }));

// @route   GET api/posts
router.get('/', (req, res) => {
	Post.find()
		.sort({ date: -1 })
		.then((posts) => res.json(posts))
		.catch((err) => res.status(404).json({ nopostsfound: 'No posts found' }));
});

// @route   GET api/posts/:id
router.get('/:id', (req, res) => {
	Post.findById(req.params.id)
		.then((post) => res.json(post))
		.catch((err) => res.status(404).json({ nopostfound: 'No post found with that ID' }));
});

// @route   POST api/posts
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validatePostInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	const newPost = new Post({
		text: req.body.text,
		name: req.body.name,
		avatar: req.body.avatar,
		user: req.user.id
	});

	newPost.save().then((post) => res.json(post));
});

// @route   DELETE api/posts/:id
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Post.findById(req.params.id)
		.then((post) => {
			if (post.user.toString() !== req.user.id) {
				return res.status(401).json({ noauthorized: 'User not authorized' });
			}

			post.remove().then(() => res.json({ success: 'true' }));
		})
		.catch((err) => res.status(404).json({ postnofound: 'Post not found' }));
});

// @route   POST api/posts/like/:id
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	User.findById(req.user.id).then((user) => {
		Post.findById(req.params.id)
			.then((post) => {
				if (post.likes.filter((like) => like.user.toString() === user.id).length > 0) {
					return res.status(400).json({ alreadyliked: 'User already liked this post' });
				}
				post.likes.unshift({ user: user.id });
				post.save().then((post) => res.json(post));
			})
			.catch((err) => res.status(404).json({ postnofound: 'Post not found' }));
	});
});

// @route   POST api/posts/unlike/:id
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	User.findById(req.user.id).then((user) => {
		Post.findById(req.params.id)
			.then((post) => {
				if (post.likes.filter((like) => like.user.toString() === user.id).length === 0) {
					return res.status(400).json({ notliked: 'You not liked this post' });
				}
				const filteredArr = post.likes.filter((like) => like.user.toString() !== user.id);
				post.likes = filteredArr;

				post.save().then((post) => res.json(post));
			})
			.catch((err) => res.status(404).json({ postnofound: 'Post not found' }));
	});
});

// @route   POST api/posts/comment/:id
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validatePostInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	Post.findById(req.params.id)
		.then((post) => {
			const newComment = {
				text: req.body.text,
				name: req.body.name,
				avatar: req.body.avatar,
				user: req.user.id
			};

			post.comments.unshift(newComment);

			post.save().then((post) => res.json(post));
		})
		.catch((err) => res.status(404).json({ postnotfound: 'No post found' }));
});

// @route   DELETE api/posts/comment/:id/:comment_id
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Post.findById(req.params.id)
		.then((post) => {
			// Check to see if comment exists
			if (post.comments.filter((comment) => comment._id.toString() === req.params.comment_id).length === 0) {
				return res.status(404).json({ commentnotexists: 'Comment does not exist' });
			}

			const filteredArr = post.comments.filter((comment) => comment.id.toString() !== req.params.comment_id);
			post.comments = filteredArr;

			post.save().then((post) => res.json(post));
		})
		.catch((err) => res.status(404).json({ postnotfound: 'No post found' }));
});
module.exports = router;
