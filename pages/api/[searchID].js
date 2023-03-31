const mysql = require('mysql');

export default function handler(req, res) {
const connection = mysql.createConnection(process.env.DATABASE_URL);

  connection.connect(function(err) {
    if (err) throw err;

    const { query, method } = req;
    const {searchID} = query;
    // console.log(searchID)
    connection.query(`SELECT * FROM Patients WHERE TYPE='Patient' AND CONCAT(FIRST, ' ', LAST) like "%${searchID}%"`, function (err, result, fields) {
      if (err) throw err;
      // console.log(result);
      res.status(200).json(result)
    });
  });  
  // connection.end();
}