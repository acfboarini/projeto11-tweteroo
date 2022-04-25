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

app.listen(5000, () => {
    console.log("a aplicacao esta rodando normalmente");
});