import express from 'express';
import cors from 'cors';
import { filterTweets, filterTweetsByUsername } from './utilFunctions.js';
import { validateTweetBody, validateUserBody } from './validateFunctions.js';

const app = express();
app.use(cors());
app.use(express.json());

export const users = [];
const tweets = [];

app.post('/sign-up', (req, res) => {
	try {
		validateUserBody(req.body);
		users.push(req.body);
		return res.sendStatus(201);
	} catch (error) {
		return res.status(error.code).send(error.message);
	}
});

app.post('/tweets', (req, res) => {
	const { tweet } = req.body;
	const { user: username } = req.headers;
	try {
		validateTweetBody({ username, tweet });
		tweets.push({ username, tweet });
		return res.sendStatus(201);
	} catch (error) {
		return res.status(error.code).send(error.message);
	}
});

app.get('/tweets', (req, res) => {
	const { page } = req.query;
	const filtered_tweets = filterTweets(tweets, page);
	return res.send(filtered_tweets);
});

app.get('/tweets/:username', (req, res) => {
	const { username } = req.params;

	const filtered_tweets = filterTweetsByUsername(tweets, username);
	return res.send(filtered_tweets);
});

const port = 5000;
app.listen(port, () => {
	console.log(`server up and running on port ${port}`);
});
