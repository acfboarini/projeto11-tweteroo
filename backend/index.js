import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let usuarios = [];
let tweets = [];

app.post("/sign-up", (req, res) => {
    console.log(req.body);
    const usuario = req.body;
    usuarios.push(usuario);
    res.send('OK');
})

app.get("/tweets", (req, res) => {
    const tweets2 = listaTweets(tweets);
    res.send(tweets2);
})

app.post("/tweets", (req,res) => {
    console.log(req.body);
    tweets.push(req.body);
    res.send('OK');
})

app.listen(5000, () => {
    console.log("a aplicacao esta rodando normalmente");
});

function listaTweets(tweets) {
    let lista_tweets = tweets.map(tweet => {
        return {
            username: tweet.username,
		    avatar: verificaAvatar(tweet.username),
	        tweet: tweet.tweet
        }
    })
    return lista_tweets;
}

function verificaAvatar(username) {
    let user = usuarios.find(usuario => {
        return usuario.username === username;
    });
    return user.avatar;
}