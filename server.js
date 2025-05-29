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

// Get All Products
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

// getProductById
server.get("/getProductById/:id", function (req, res) {
  var product_id = req.params.id;
  var sqlQuery = "CALL getProductById(?);";

  db.query(sqlQuery, [product_id], function (error, results) {
    if (error) {
      return res.json({ error: error });
    }

    if (results && results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  });
});

// getProductsByCategory
server.get("/getProductsByCategory/:id", function (req, res) {
  var category = req.params.id;
  var sqlQuery = "CALL getProductsByCategory(?);";

  db.query(sqlQuery, [category], function (error, results) {
    if (error) {
      return res.json({ error: error });
    }

    if (results && results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  });
});

// addProduct
server.post("/addProduct", function (req, res) {
  let productTitle = req.body.productTitle;
  let productImage = req.body.productImage;
  let productDetails = req.body.productDetails;
  let categories = req.body.categories;
  let price = req.body.price;
  let availability = req.body.availability;
  let productDimensions = req.body.productDimensions;
  let todaysDeals = req.body.todaysDeals;
  let addProduct = "CALL `addProduct`(?,?,?,?,?,?,?,?)";

  db.query(
    addProduct,
    [
      productTitle,
      productImage,
      productDetails,
      categories,
      price,
      availability,
      productDimensions,
      todaysDeals,
    ],
    (error, data) => {
      if (error) {
        res.json({ ErrorMessage: error });
      } else {
        res.json({
          message: "successful!",
          update: true,
          data: data,
        });
      }
    }
  );
});

// updateProduct
server.patch("/updateProduct/:id", function (req, res) {
  var p_product_id = req.params.id;
  let product_title = req.body.new_product_title;
  let product_image = req.body.new_product_image;
  let product_details = req.body.new_product_details;
  let categories = req.body.new_categories;
  let price = req.body.new_price;
  let availability = req.body.new_availability;
  let todays_deals = req.body.new_todays_deals;
  let updateProduct = "CALL `updateProduct`(?,?,?,?,?,?,?,?)";

  db.query(
    updateProduct,
    [
      product_title,
      product_image,
      product_details,
      categories,
      price,
      availability,
      todays_deals,
      p_product_id,
    ],
    (error, data) => {
      if (error) {
        res.json({ ErrorMessage: error });
      } else {
        res.json({
          message: "successful!",
          update: true,
          data: data,
        });
      }
    }
  );
});

// deleteProductById
server.delete("/deleteProductById/:id", function (req, res) {
  var productId = req.params.id;
  var sqlQuery = "CALL deleteProductById(?);";

  db.query(sqlQuery, [productId], function (error, results) {
    if (error) {
      return res.json({ error: error });
    }
    if (results && results[0] && results[0].affectedRows > 0) {
      res.json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  });
});

// Get Todays Deals
server.get("/getTodaysDeals", function (req, res) {
  var sqlQuery = "CALL getTodaysDeals();";
  db.query(sqlQuery, [], function (error, data) {
    if (error) {
      res.json(error);
    }
    if (data) {
      res.json(data[0]);
    }
  });
});

// Sort Product by Price
server.get("/sortProductsByPrice", function (req, res) {
  var sqlQuery = "CALL sortProductsByPrice();";
  db.query(sqlQuery, [], function (error, data) {
    if (error) {
      res.json(error);
    }
    if (data) {
      res.json(data[0]);
    }
  });
});
