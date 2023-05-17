const mysql = require("promise-mysql");

let mysqlconnection: any;
async function createConnection() {
  let conn = await mysql.createConnection({
    host: "localhost",
    port: "3308",
    user: "root",
    password: "admin123",
    database: "austin",
  });
  mysqlconnection = conn;
}
createConnection();
export default mysqlconnection;
