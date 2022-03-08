// le root du projet
const express = require('express')
const cors = require('cors');
const crypto = require('crypto');
const bodyparser = require('body-parser');


const app = express()
require('dotenv').config(); // pour récupérer les données dans .env

// TODO : A specifier pour pas rendre l'api publique
app.use(cors({
    origin: '*'
}));

// Si besoin d'explications, demandez moi
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

// Ecoute sur le PORT 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Le serveur tourne sur le port : ${PORT}`);
})

app.post("/login", loginHandler)

/**
 * Méthode permettant de vérifier la requête POST de login
 * @response avec un body si connexion possible, sans sinon
 */
const loginHandler = (req, res) => {
    // TODO : vérfier en BDD

    //console.log(request.body)
    const {email, password} = req.body;
    const date = Date.now();
    //console.log(getHashedPassword(password))

    //if (users.find(user => user.email === email && user.password === getHashedPassword(password))) { // remplacer par une req bdd
    findOneUtilisateurByEmailPSD([email, password], (err, data) => {
        if (err)
            err.erreur === "not_found" ? res.status(404).send({message: 'Utilisateur non trouvé'}) : res.status(500).send({message: "Erreur"});
        else {
            const authToken = getToken(email, date);
            updateUserToken(email, authToken, date);
            res.json({"auth": authToken}).send()
        }

    })

}


/**
 * Fonction permettant de créer un token d'authentification
 * @param email {string} Email de l'utilisateur
 * @param date {number} Timestamp
 * @returns {string} Le token hashé et en base64 composé d'une random string + email + timestamp
 */
const getToken = (email, date) => {
    return getHashedPassword(crypto.randomBytes(48).toString() + email + date.toString());
}

/**
 * Fonction permettant de transformer une string en un hash sha256 en base64
 * @param password {string} La string à transformer
 * @returns {string} La string hashée et en base 64
 */
const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    return sha256.update(password).digest('base64');
}

/**
 * Méthode permettant de trouver un utilisateur en fonction de son password et mot de passe
 * @param profil {array<string>} email + password
 * @param cb {callback} traitement du résultat
 */
const findOneUtilisateurByEmailPSD = (profil, cb) => {
    db.query("SELECT Email FROM utilisateur WHERE Email = ? and MotDePasse = ?;", profil, (err, rows) => {
        if (err) cb(err, null);

        if (rows.length) {
            cb(null, rows[0]);
            return;
        }
        cb({erreur : "not_found"});
    });

}

const updateUserToken = (email, token, timestamp) => {
    db.getConnection((err, conn) => {
        conn.query('UPDATE utilisateur SET token = ?, tokenTimeStamp = ? WHERE Email = ?;', [token, timestamp, email], function (err, data) {
            if (err) throw err;
        });
    });
}