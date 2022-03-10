import {connection} from "./Config.js"
/**
 * Méthode permettant de trouver un utilisateur en fonction de son password et mot de passe
 * @param profil {array<string>} email + password
 * @param cb {callback} traitement du résultat
 */
export const findOneUtilisateurByEmailPSD = (profil, cb) => {
    connection.query("SELECT login FROM utilisateur WHERE login = ? and password = ?;", profil, (err, rows) => {
        if (err) cb(err, null);

        if (rows.length) {
            cb(null, rows[0]);
            return;
        }
        cb({erreur : "not_found"}, null);
    });

}

export const updateUserToken = (email, token, timestamp) => {
    connection.query('UPDATE utilisateur SET token = ?, tokenTime = ? WHERE login = ?;', [token, timestamp, email], function (err, data) {
        if (err) cb(err);
        
        cb(null)
    });
}