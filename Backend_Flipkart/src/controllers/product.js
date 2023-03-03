const shortid = require("shortid");
const slugify = require("slugify");
const Product = require("../models/product");
const Category = require("../models/category");
exports.createProduct = (req, res) => {
  //   res.status(200).json({ file: req.files, body: req.body }); //s nek
  const { name, price, description, category, quantity, createdBy } = req.body;

  let productPictures = [];

  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.location };
    });
  }

  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    quantity,
    description,
    productPictures,
    category,
    createdBy: req.user._id,
  });

  product.save((err, product) => {
    if (err) return res.status(400).json({ err });
    if (product) {
      res.status(201).json({ product, files: req.files });
    }
  });
};
