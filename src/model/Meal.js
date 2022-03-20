import {connection} from "./config/Config.js"

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

export const addResto = (data, cb) => {
    connection.query("INSERT INTO resto (id, nom, descriptif, location) VALUES(NULL, ?,?,?)", data, (err, rows) => {
        return err ? cb("Erreur") : cb(null)
    })
}

export const vote = (data, cb) => {
    connection.query("INSERT INTO votes (id, user, resto, voie) VALUES (NULL, ?,?, ?)", data, (err, rows) => {
        return err ? cb("Erreur : Vous avez déjà voté pour ce restaurant") : cb(null)
    })
}