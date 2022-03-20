import * as crypto from "crypto"
import {findOneUtilisateurByEmailPSD, updateUserToken} from "../model/User.js"

/**
 * Méthode permettant de vérifier la requête POST de login
 * @response avec un body si connexion possible, sans sinon
 */
export const loginHandler = (req, res) => {
    // TODO : vérfier en BDD

    //console.log(request.body)
    const {login, password} = req.body;
    const date = Date.now();


    //if (users.find(user => user.email === email && user.password === getHashedPassword(password))) { // remplacer par une req bdd
    findOneUtilisateurByEmailPSD([login, getHashedPassword(password)], (err, data) => {
        if (err)
            return err.erreur === "not_found" ? res.status(404).send({err: 'Utilisateur non trouvé'}) : res.status(500).send({err: "Error"});

        const authToken = getToken(login, date);
        updateUserToken(login, authToken, date, (err) => {
            if (err)
                return res.status(404).send({err: 'Erreur token'})
            req.session.user={"login": login, "id": data.id, "date": date, "token":authToken, loggedIn:true}
            req.session.save()
            //console.log(req.session)
            //console.log(req.sessionID)
            res.status(200).send({"auth": authToken, message: "login done", err:null})
                
        });

    })

}

/**
 * Méthode permettant de savoir si un user est connecté
 * @param req La requête
 * @param res La réponse
 */
export const isLoggedIn = (req, res) =>{
    // console.log(req.sessionID)
    // console.log(`Logged in ${req.session.user}`)
    // console.log(req.session)
    return req.session.user ? res.status(200).send({loggedIn : true, user: req.session.user}) : res.status(404).send({loggedIn : false})
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