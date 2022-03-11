// le root du projet
import express from 'express';
import cors from 'cors';
import {loginHandler, isLoggedIn} from "./src/controler/User.js"
import pkg from 'body-parser';
const { json, urlencoded } = pkg;
import cookieParser from "cookie-parser";
import session from "express-session";
import {getMealsData} from "./src/controler/Meal.js";

const app = express()

// TODO : A specifier pour pas rendre l'api publique
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
}));

// Si besoin d'explications, demandez moi
app.use(json());
app.use(urlencoded({extended: true}));
app.use(cookieParser())
app.use(session({
    secret:"pjPweb",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000*60*60*1 }
}))

// Ecoute sur le PORT 4000
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Le serveur tourne sur le port : ${PORT}`);
})

app.post("/login", loginHandler)
app.get("/login", isLoggedIn)
app.get("/getData", getMealsData)