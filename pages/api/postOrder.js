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
    const ORDERID = generateID();
    //const TYPE = "Patient";
    const [DATE, ORDERS, FIRST, LAST, ADDRESS] = newEntry; 
    console.log(ORDERID, DATE, ORDERS, FIRST, LAST, ADDRESS)
    connection.query(`INSERT INTO Orders (ORDERID, DATE, ORDERS, FIRST, LAST, ADDRESS)
     VALUES ('${ORDERID}', '${DATE}', '${ORDERS}', '${FIRST}', '${LAST}', '${ADDRESS}')`, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.status(200).json(result)
    });
  });  
    // connection.end();
  
}