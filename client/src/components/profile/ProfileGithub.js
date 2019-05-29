import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProfileGithub = (props) => {
	const [ githubState, setGithubState ] = useState({
		clientId: '5c3df18da962f562e919',
		clientSecret: '637203c74ede0d890f4e7700f564ac4a664e41a9',
		count: 5,
		sort: 'created:asc',
		repos: []
	});

	const { username } = props;
	const { count, sort, clientId, clientSecret, repos } = githubState;

	const getGithubRepos = async () => {
		const response = await fetch(
			`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
		);
		const data = await response.json();
		setGithubState({ ...githubState, repos: data });
	};

	useEffect(() => {
		getGithubRepos();
	}, []);

	const repoItems = repos.map((repo) => (
		<div key={repo.id} className="card card-body mb-2">
			<div className="row">
				<div className="col-md-6">
					<h4>
						<Link to={repo.html_url} className="text-info" target="_blank">
							{repo.name}
						</Link>
					</h4>
					<p>{repo.description}</p>
				</div>
				<div className="col-md-6">
					<span className="badge badge-info mr-1">Stars: {repo.stargazers_count}</span>
					<span className="badge badge-secondary mr-1">Watchers: {repo.watchers_count}</span>
					<span className="badge badge-success">Forks: {repo.forks_count}</span>
				</div>
			</div>
		</div>
	));

	return (
		<React.Fragment>
			<hr />
			<h3 className="mb-4">Latest Github Repos</h3>
			{repoItems}
		</React.Fragment>
	);
};

export default ProfileGithub;
