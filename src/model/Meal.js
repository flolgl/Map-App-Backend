import {connection} from "./Config.js"

export const getAllResto = (cb) => {
    connection.query("SELECT * FROM resto;", (err, rows) => {
        if (err) cb(err, null);

        //console.log(rows)
        if (rows.length) {
            cb(null, rows);
            return;
        }
        cb({erreur : "no_data"}, null);
    });

}