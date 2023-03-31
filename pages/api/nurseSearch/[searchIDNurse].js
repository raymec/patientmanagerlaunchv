const mysql = require('mysql');

export default function handler(req, res) {
const connection = mysql.createConnection(process.env.DATABASE_URL);

  connection.connect(function(err) {
    if (err) throw err;

    const { searchIDNurse } = req.query;
    const [nurse, patient] = searchIDNurse.split(','); 
    connection.query(`SELECT * FROM Patients WHERE NURSE = '${nurse}' AND CONCAT(FIRST, ' ', LAST) LIKE '%${patient}%'`, function (err, result) {
      if (err) throw err;
      res.status(200).json(result); 
    });
  });  
  // connection.end();
}