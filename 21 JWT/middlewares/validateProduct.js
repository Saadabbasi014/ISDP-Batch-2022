// const { validateProduct } = require("../models/Product");
const Product = require("../models/Product");
module.exports = function (req, res, next) {
  let { error } = Product.validateProduct(req.body);
  if (error) {
    console.log(error);
    return res.send(401).send(error.message);
  }
  next();
};
