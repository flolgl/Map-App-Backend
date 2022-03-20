import {connection} from "./config/Config.js"
/**
 * Méthode permettant de trouver un utilisateur en fonction de son password et mot de passe
 * @param profil {array<string>} email + password
 * @param cb {callback} traitement du résultat
 */
export const findOneUtilisateurByEmailPSD = (profil, cb) => {
    connection.query("SELECT id, login FROM utilisateur WHERE login = ? and password = ?;", profil, (err, rows) => {
        if (err) cb(err, null);

        //console.log(rows)
        if (rows.length) {
            cb(null, rows[0]);
            return;
        }
        cb({erreur : "not_found"}, null);
    });

}
/**
 * Méthode permettant d'update le token d'un User
 * @param email l'email du User
 * @param token le nouveau token
 * @param timestamp le timestamp de l'ajout
 * @param cb Le callback acceptant 1 argument (erreur s'il y en a un ou null)
 */
export const updateUserToken = (email, token, timestamp, cb) => {
    connection.query('UPDATE utilisateur SET token = ?, tokenTime = ? WHERE login = ?;', [token, timestamp, email], function (err, data) {
        if (err) cb(err);
        
        cb(null)
    });
}