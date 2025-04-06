import express from "express";

import mysql2 from "mysql2";

import cors from "cors";

const server = express();

server.use(cors());

server.use(express.json());

const db = mysql2.createPool({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "ecommerce_week4",
  connectionLimit: 10,
});

const port = 4011;

server.listen(port, function () {
  console.log("server started on port", port);
});
server.get("/getProducts", function (req, res) {
  var sqlQuery = "CALL `getAllProducts`();";
  db.query(sqlQuery, [], function (error, data) {
    if (error) {
      res.json(error);
    }
    if (data) {
      res.json(data[0]);
    }
  });
});
// server.get("/yo",function(req,res){
//     res.json({response:"I hear you"});
// });

// server.get("/TodaysDeals", function(req, res){
//     var sqlQuery = "CALL `GetAllDeals`";
//     db.query(sqlQuery,function(error,data){
//         if(error){
//             res.json(error);
//         }
//         if(data){
//             res.json(data[0]);
//         }
//     });
// });

// server.post("/addProduct", function (req, res) {
//     let productName = req.body.productName;
//     let price = req.body.price;
//     let discount = req.body.discountAmount;
//     let img = req.body.img;
//     let addProduct = "CALL `addProduct`(?,?,?,?)";

//     db.query(addProduct, [productName, price, discount, img], (error, data) => {
//       if (error) {
//         res.json({ ErrorMessage: error });
//       } else {
//         res.json({
//           message: "successful!",
//           update: true,
//           data: data,
//         });
//       }
//     });
//   });

//   server.post("/hello", function (req, res) {
//     var datafromclient = req.body.name;
//     res.json({ response: "hey there " + datafromclient });
//   });
