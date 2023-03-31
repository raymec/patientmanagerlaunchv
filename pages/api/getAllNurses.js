//import { NextApiRequest, NextApiResponse } from "next";
const mysql = require("mysql");

export default function getAllNurses(req, res){
    // if(req.method !== 'GET'){
    //     res.status(500).json({message: 'bad request: use GET'})
    // }
    const connection = mysql.createConnection(process.env.DATABASE_URL);
    //const { query, method } = req;
    connection.connect(function (err) {
        if (err) throw err;
        connection.query(`SELECT * FROM Nurses`, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.status(200).json(result)
          }
        );
      });
}