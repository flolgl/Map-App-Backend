import {connection} from "./config/Config.js"

/**
 * Model permettant de récupérer les données des restaurants
 * @param cb Le callback acceptant 2 arguments (erreur et les données)
 */
export const getAllResto = (cb) => {
    connection.query("SELECT * FROM resto ORDER BY upvotes DESC;",null, (err, rows) => {
        if (err) cb(err, null);

        //console.log(rows)
        if (rows.length) {
            cb(null, rows);
            return;
        }
        cb({erreur : "no_data"}, null);
    });

}
/**
 * Model permettant d'ajouter un restaurant
 * @param data Les données à ajouter (nom, descriptif et location)
 * @param cb Le callback acceptant 1 argument (erreur s'il y en a un ou null)
 */
export const addResto = (data, cb) => {
    connection.query("INSERT INTO resto (id, nom, descriptif, location) VALUES(NULL, ?,?,?)", data, (err, rows) => {
        return err ? cb("Erreur") : cb(null)
    })
}

/**
 * Model de voter pour un restaurant
 * @param data Les données à ajouter (user, restaurant, voie)
 * @param cb Le callback acceptant 1 argument (erreur s'il y en a un ou null)
 */
export const vote = (data, cb) => {
    connection.query("INSERT INTO votes (id, user, resto, voie) VALUES (NULL, ?,?, ?)", data, (err, rows) => {
        return err ? cb("Erreur : Vous avez déjà voté pour ce restaurant") : cb(null)
    })
}