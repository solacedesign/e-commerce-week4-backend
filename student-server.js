// import express from "express";

// import mysql2 from "mysql2";

// import cors from "cors";

// const server = express();

// server.use(cors());

// server.use(express.json());

// const db = mysql2.createPool({
//   host: "localhost",
//   port: 8889,
//   user: "root",
//   password: "root",
//   database: "Web25FirstDB",
//   connectionLimit: 10,
// });

// const port = 4011;

// server.listen(port, function () {
//   console.log("server started on port", port);
// });

// server.get("/students/:id", function (req, res) {
//   var sqlQuery = "`GetStudentByID`(?);";
//   var studentID = req.params.id;
//   db.query(sqlQuery, [studentID], function (error, data) {
//     if (error) {
//       res.json(error);
//     }
//     if (data) {
//       res.json(data[0]);
//     }
//   });
// });
