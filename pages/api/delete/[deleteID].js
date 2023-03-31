const mysql = require('mysql');

export default function handler(req, res) {
const connection = mysql.createConnection(process.env.DATABASE_URL);

const id = req.query.deleteID
console.log(id)
  connection.connect(function(err) {
    if (err) throw err;
  
    connection.query(`DELETE FROM Patients WHERE ID = '${id}'`, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.status(200).json(result)
    });
  });  
    // connection.end();
}