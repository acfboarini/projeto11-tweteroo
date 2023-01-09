import { users } from './index.js';

const tweets_by_page = 3;

export function filterTweets(tweets, page) {
	const filtered_tweets = [];

	const first_index = calculateFirstIndex(tweets.length, page);
	const last_index = calculateLastIndex(first_index);

	for (let i = first_index; i > last_index; i--) {
		if (tweets[i]) {
			const tweet = buildTweetFormat(tweets[i]);
			filtered_tweets.push(tweet);
		}
	}
	return filtered_tweets;
}

export function filterTweetsByUsername(tweets, username) {
	const filtered_tweets = [];
	for (let tweet of tweets) {
		if (tweet.username === username) {
			const formated_tweet = buildTweetFormat(tweet);
			filtered_tweets.push(formated_tweet);
		}
	}
	return filtered_tweets;
}

function calculateFirstIndex(tweetsLength, page) {
	const last_index = tweetsLength - 1 - tweets_by_page * (page - 1);
	return last_index;
}

function calculateLastIndex(first_index) {
	return first_index - tweets_by_page;
}

function buildTweetFormat(tweet) {
	const user = findUser(tweet.username);
	return {
		...user,
		tweet: tweet.tweet,
	};
}

function findUser(username) {
	return users.find((user) => {
		return user.username === username;
	});
}
