// le root du projet
import express from 'express';
import cors from 'cors';
import {loginHandler} from "./src/controler/User.js"
import pkg from 'body-parser';
const { json, urlencoded } = pkg;

const app = express()

// TODO : A specifier pour pas rendre l'api publique
app.use(cors({
    origin: '*'
}));

// Si besoin d'explications, demandez moi
app.use(json());
app.use(urlencoded({extended: true}));

// Ecoute sur le PORT 4000
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Le serveur tourne sur le port : ${PORT}`);
})

app.post("/login", loginHandler)