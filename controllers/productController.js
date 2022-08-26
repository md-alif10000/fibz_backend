const Product = require("../models/productModel");
const Section = require("../models/sectionModel");
const Category = require("../models/categoryModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const Nishe = require("../models/Nishe");
const cloudinary = require("cloudinary").v2;

// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  var images = [];

  console.log(req.body);

  req.body.sizes = JSON.parse(req.body.sizes);
  req.body.colors = JSON.parse(req.body.colors);

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  // const imagesLinks = [
  //   {
  //     public_id: req.body.public_id,
  //     url: req.body.url,
  //   },
  // ];
  const imagesLinks = [];

  console.log(images);

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload_large(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  // req.body.user = req.user._id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Get All Product
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  // const resultPerPage = 4;
  // const productsCount = await Product.countDocuments();

  // const apiFeature = new ApiFeatures(Product.find(), req.query)
  //   .search()
  //   .filter();

  // let products = await apiFeature.query;

  // let filteredProductsCount = products.length;

  // apiFeature.pagination(resultPerPage);

  // products = await apiFeature.query;
  const products = await Product.find().populate("section category");

  console.log("hereee");

  res.status(200).json({
    success: true,
    products,
    // productsCount,
    // resultPerPage,
    // filteredProductsCount,
  });
});

exports.getFeaturedProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find({ featured: true });

  res.status(200).json({
    success: true,
    products,
  });
});

exports.getProductsBySection = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const products = await Product.find({ section: id });

  res.status(200).json({
    success: true,
    products,
  });
});

exports.getProductsByCategory = catchAsyncErrors(async (req, res, next) => {
  const id = req.params.id;
  const products = await Product.find({ category: id });

  res.status(200).json({
    success: true,
    products,
  });
});
exports.getProductsByNishe = catchAsyncErrors(async (req, res, next) => {
  const nishe = req.params.nishe;
  const products = await Product.find({ nishe: { slug: nishe } });

  res.status(200).json({
    success: true,
    products,
  });
});

// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find().populate(
    "section category subCategory"
  );

  res.status(200).json({
    success: true,
    products,
  });
});

// Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product -- Admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  req.body.sizes = JSON.parse(req.body.sizes);
  req.body.colors = JSON.parse(req.body.colors);

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  // Deleting Images From Cloudinary
  // for (let i = 0; i < product.images.length; i++) {
  //   await cloudinary.uploader.destroy(product.images[i].public_id);
  // }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
});

// Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

exports.getHomePageData = catchAsyncErrors(async (req, res, next) => {
  const featuredProducts = await Product.find({ featured: true }).limit(8);
  const mensProducts = await Product.find({
    section: "6282869fd0eb960004f727ee",
  }).limit(4);

  const womensProducts = await Product.find({
    section: "62823f12272ac62804e371ec",
  }).limit(4);
  const latestProducts = await Product.find().sort({ createdAt: -1 }).limit(4);
  const sections = await Section.find();
  const categories = await Category.find();
  const nishes = await Nishe.find();

  res.status(200).json({
    success: true,
    featuredProducts,
    mensProducts,
    womensProducts,
    latestProducts,
    sections,
    categories,
    nishes
  });
});
