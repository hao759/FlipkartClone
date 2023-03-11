const category = require("../models/category");
const slugify = require("slugify");

function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      type: cate.type,
      children: createCategories(categories, cate._id),
    });
  }
  return categoryList;
}

exports.createCategory = (req, res) => {
  if (req.body.slug == null) req.body.slug = "99";
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.slug),
  };
  if (req.file) {
    categoryObj.categoryImage =
      process.env.LOCALHOST + "/public/" + req.file.filename;
  }

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }
  const cat = new category(categoryObj);
  cat.save((err, category) => {
    if (err)
      return res.status(400).json({
        mess: err,
      });
    if (category)
      return res.status(200).json({
        category,
      });
  });
};

exports.getCategory = (req, res) => {
  category.find({}).exec((error, categories) => {
    if (error) return res.status(400).json({ error });
    if (categories) {
      const categoryList = createCategories(categories);
      res.status(200).json({ categoryList });
    }
  });
};
