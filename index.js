import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let usuarios = [];
let tweets = [];

app.post('/sign-up', (req, res) => {
	usuarios.push(req.body);
	res.send('OK');
});

app.get('/tweets', (req, res) => {
    console.log(req.query);
	const tweets_send = listaTweets(tweets);
	res.send(tweets_send);
});

app.post('/tweets', (req, res) => {
	tweets.push(req.body);
	res.send('OK');
});

function listaTweets(tweets) {
	let lista_tweets = [];
	if (tweets.length <= 10) {
		lista_tweets = tweets.map((tweet) => {
			return {
				username: tweet.username,
				avatar: verificaAvatar(tweet.username),
				tweet: tweet.tweet,
			};
		});
	} else {
		let inicio = tweets.length - 10;
		for (let i = inicio; i < tweets.length; i++) {
			const tweet = {
				username: tweets[i].username,
				avatar: verificaAvatar(tweets[i].username),
				tweet: tweets[i].tweet,
			};
			lista_tweets.push(tweet);
		}
	}
	return lista_tweets.reverse();
}

function verificaAvatar(username) {
	let user = usuarios.find((usuario) => {
		return usuario.username === username;
	});
	return user.avatar;
}

const port = 5000;
app.listen(port, () => {
	console.log(`server up and running on port ${port}`);
});
