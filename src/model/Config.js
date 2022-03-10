import { createConnection } from 'mysql';
import 'dotenv/config';

export const connection = createConnection({
  host     : process.env.DBHOST,
  user     : process.env.DBUSER,
  password : process.env.DBPW,
  database : process.env.DB


}); 

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
});