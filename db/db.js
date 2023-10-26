const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

let connection;

try{

    connection = mysql.createConnection({
        host : process.env.DBHOST,
        user : process.env.DBUSER,
        database : process.env.DBNAME
    });

}catch(error){
    console.log("Error al conectar con la base de datos: ");
    console.log(error);
}

module.exports = {connection};