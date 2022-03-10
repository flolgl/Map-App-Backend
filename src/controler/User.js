import * as crypto from "crypto"
import {findOneUtilisateurByEmailPSD, updateUserToken} from "../model/User.js"

/**
 * Méthode permettant de vérifier la requête POST de login
 * @response avec un body si connexion possible, sans sinon
 */
export const loginHandler = (req, res) => {
    // TODO : vérfier en BDD

    //console.log(request.body)
    const {email, password} = req.body;
    const date = Date.now();
    //console.log(getHashedPassword(password))

    //if (users.find(user => user.email === email && user.password === getHashedPassword(password))) { // remplacer par une req bdd
    findOneUtilisateurByEmailPSD([email, password], (err, data) => {
        if (err)
            return err.erreur === "not_found" ? res.status(404).send({message: 'Utilisateur non trouvé'}) : res.status(500).send({message: "Erreur"});

        const authToken = getToken(email, date);
        updateUserToken(email, authToken, date, (err) => {
            if (err)
                return res.status(404).send({message: 'Erreur token'})
                
            res.status(200).send({"auth": authToken, message: "login done"})
                
        });

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