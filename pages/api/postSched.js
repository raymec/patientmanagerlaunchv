const mysql = require('mysql');

export default function handler(req, res) {
const connection = mysql.createConnection(process.env.DATABASE_URL);
console.log('Connected to PlanetScale!');

function generateID(){
  let ms = Date.now()/2;
  return (Math.floor(Math.random() * ms)).toString();
}

  connection.connect(function(err) {
    if (err) throw err;
    
    const newEntry = Object.values(req.body)
    const SCHEDID = generateID();
    //const TYPE = "Patient";
    const [DATE, TIME, FIRST, LAST, NURSE] = newEntry; 
    console.log(SCHEDID, DATE, TIME, FIRST, LAST, NURSE)
    connection.query(`INSERT INTO Schedules (SCHEDID, DATE, TIME, FIRST, LAST, NURSE)
     VALUES ('${SCHEDID}', '${DATE}', '${TIME}', '${FIRST}', '${LAST}', '${NURSE}')`, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.status(200).json(result)
    });
  });  
    // connection.end();
  
}