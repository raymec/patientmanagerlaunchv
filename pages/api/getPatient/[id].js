const mysql = require("mysql");

export default function handler(req, res) {
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const { query, method } = req;
  const patientID = query.id
  
  console.log(patientID);
  connection.connect(function (err) {
    if (err) throw err;

    connection.query(
      `SELECT * FROM Patients WHERE ID = "${patientID}"`,
      function (err, result, fields) {
        if (err) throw err;
        console.log(result);

        res.status(200).json(result)
      }
    );
  });
  // connection.end();
}
