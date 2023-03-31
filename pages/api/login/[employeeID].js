const mysql = require('mysql');

export default function handler(req, res) {
const connection = mysql.createConnection(process.env.DATABASE_URL);

  connection.connect(function(err) {
    if (err) throw err;
    let staff = 'Managers'; 
    const arry = decodeURI(req.query.employeeID).split(','); 
    const [ADDRESS, PASS] = arry; 

    if(ADDRESS.includes('@emp.')) {
      staff = 'Nurses';
      connection.query(`SELECT * FROM ${staff} WHERE ADDRESS = '${ADDRESS}' AND NURSE = '${PASS}'`, function (err, result) {
        if (err) throw err;
        res.status(200).json(result)
      });      
    }

    if(ADDRESS.includes('@mgr.')) {
      connection.query(`SELECT * FROM ${staff} WHERE ADDRESS = '${ADDRESS}' AND NURSE = '${PASS}'`, function (err, result) {
        if (err) throw err;
        res.status(200).json(result)
      });      
    }
    
    //SELECT FROM NURSE
    

  });  
  // connection.end();
}

