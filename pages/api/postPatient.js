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
    const ID = generateID();
    const TYPE = "Patient";
    const [INSURANCE, FIRST, LAST, SEX, ADDRESS, CITY, STATE, ZIP, NURSE, ORDERS, NOTES, MEDHIST, MEDLIST] = newEntry; 
    console.log(ID, TYPE, INSURANCE, FIRST, LAST, SEX, ADDRESS, CITY, STATE, ZIP, NURSE, ORDERS, NOTES, MEDHIST, MEDLIST)
    connection.query(`INSERT INTO Patients (ID, TYPE, INSURANCE, FIRST, LAST, SEX, ADDRESS, CITY, STATE, ZIP, NURSE, ORDERS, NOTES, MEDHIST, MEDLIST)
     VALUES ('${ID}', '${TYPE}', '${INSURANCE}', '${FIRST}', '${LAST}', '${SEX}', '${ADDRESS}', '${CITY}', '${STATE}', '${ZIP}', '${NURSE}', '${ORDERS}', '${NOTES}', '${MEDHIST}', '${MEDLIST}')`, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.status(200).json(result)
    });
  });  
    // connection.end();
  
}