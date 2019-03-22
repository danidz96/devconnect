const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

// @route   GET api/profile/all
router.get('/all', (req, res) => {
	const errors = {};
	Profile.find()
		.populate('user', [ 'name', 'avatar' ])
		.then((profiles) => {
			if (!profiles) {
				errors.noprofiles = 'There are no profiles';
				res.status(404).json(errors);
			}

			res.json(profiles);
		})
		.catch((err) => res.status(404).json(errors));
});

// @route   GET api/profile/handle/:handle
router.get('/handle/:handle', (req, res) => {
	const errors = {};
	Profile.findOne({ handle: req.params.handle })
		.populate('user', [ 'name', 'avatar' ])
		.then((profile) => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this user';
				res.status(404).json(errors);
			}

			res.json(profile);
		})
		.catch((err) => res.status(404).json(err));
});

// @route   GET api/profile/user/:id
router.get('/user/:user_id', (req, res) => {
	const errors = {};
	Profile.findOne({ user: req.params.user_id })
		.populate('user', [ 'name', 'avatar' ])
		.then((profile) => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this user';
				res.status(404).json(errors);
			}

			res.json(profile);
		})
		.catch((err) => res.status(404).json(err));
});

// @route   GET api/profile/test
router.get('/test', (req, res) => res.json({ msg: 'profile works' }));

// @route   GET api/profile
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const errors = {};
	Profile.findOne({ user: req.user.id })
		.populate('user', [ 'name', 'avatar' ])
		.then((profile) => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this user';
				return res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch((err) => res.status(404).json(err));
});

// @route   POST api/profile
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validateProfileInput(req.body);

	// Check Validation
	if (!isValid) {
		// Return any errors with 400 status
		return res.status(400).json(errors);
	}

	// Get fields
	const profileFields = {};
	profileFields.user = req.user.id;
	if (req.body.handle) profileFields.handle = req.body.handle;
	if (req.body.company) profileFields.company = req.body.company;
	if (req.body.website) profileFields.website = req.body.website;
	if (req.body.location) profileFields.location = req.body.location;
	if (req.body.bio) profileFields.bio = req.body.bio;
	if (req.body.status) profileFields.status = req.body.status;
	if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
	// Skills - Spilt into array
	if (typeof req.body.skills !== 'undefined') {
		profileFields.skills = req.body.skills.split(',').map((skill) => skill.trim());
	}

	// Social
	profileFields.social = {};
	if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
	if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
	if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
	if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
	if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

	Profile.findOne({ user: req.user.id }).then((profile) => {
		if (profile) {
			// Update
			Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true }).then((profile) =>
				res.json(profile)
			);
		} else {
			// Create

			// Check if handle exists
			Profile.findOne({ handle: profileFields.handle }).then((profile) => {
				if (profile) {
					errors.handle = 'That handle already exists';
					res.status(400).json(errors);
				}

				// Save Profile
				new Profile(profileFields).save().then((profile) => res.json(profile));
			});
		}
	});
});

// @route		POST api/profile/experience
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validateExperienceInput(req.body);

	// Check Validation
	if (!isValid) {
		// Return any errors with 400 status
		return res.status(400).json(errors);
	}

	Profile.findOne({ user: req.user.id }).then((profile) => {
		const newExp = {
			title: req.body.title,
			company: req.body.company,
			from: req.body.from,
			location: req.body.location,
			to: req.body.to,
			current: req.body.current,
			description: req.body.description
		};

		// Add to exp arr
		profile.experience.unshift(newExp);
		profile.save().then((profile) => res.json(profile));
	});
});

// @route		POST api/profile/education
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validateEducationInput(req.body);

	// Check Validation
	if (!isValid) {
		// Return any errors with 400 status
		return res.status(400).json(errors);
	}

	Profile.findOne({ user: req.user.id }).then((profile) => {
		const newEducation = {
			school: req.body.school,
			degree: req.body.degree,
			from: req.body.from,
			fieldofstudy: req.body.fieldofstudy,
			to: req.body.to,
			current: req.body.current,
			description: req.body.description
		};
		// Add to education arr
		profile.education.unshift(newEducation);
		profile.save().then((profile) => res.json(profile));
	});
});

module.exports = router;
