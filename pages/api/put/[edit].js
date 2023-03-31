const mysql = require('mysql');

export default function handler(req, res) {
const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.connect(function(err) {
  if(err) throw err; 
  const {FIRST, LAST, INSURANCE, SEX, ADDRESS, CITY, STATE, ZIP, NURSE, ORDERS, NOTES, ID, MEDHIST, MEDLIST} = req.body;

  connection.query(`UPDATE Patients SET INSURANCE = '${INSURANCE}', FIRST = '${FIRST}', LAST = '${LAST}', SEX = '${SEX}', ADDRESS = '${ADDRESS}', CITY = '${CITY}', STATE = '${STATE}', ZIP = '${ZIP}', NURSE = '${NURSE}', ORDERS = '${ORDERS}', NOTES = '${NOTES}', MEDHIST = '${MEDHIST}', MEDLIST = '${MEDLIST}' WHERE ID = '${ID}'`, function(err, result){
    if (err) throw err;
    res.status(200).json(result); 
  }); 
})
}