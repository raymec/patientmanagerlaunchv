const mysql = require("mysql");

export default function getSchedules(req, res){
    
    const connection = mysql.createConnection(process.env.DATABASE_URL);
    connection.connect(function (err) {
        if (err) throw err;
        connection.query(`SELECT * FROM Schedules`, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.status(200).json(result)
          }
        );
      });
}