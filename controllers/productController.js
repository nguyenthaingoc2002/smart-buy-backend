import Product from "../models/products.js";
export const getAllProduct = async (req, res) => {
  try {
    const pageNumber = req.query.page || 1;
    const options = {
      page: pageNumber,
      limit: 16,
      projection: { name: 1, price: 1, url_thumbnail: 1, brand: 1, category_name: 1 }
    };
    const result = await Product.paginate({}, options);
    const allProducts = result.docs
    res.status(200).json({
      success: true,
      msg: "Find All Product Success",
      allProducts: allProducts,
      numberPage: result.totalPages
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getProduct = async (req, res) => {
  try {

    const {productId} = req.params;
    const product = await Product.findById(productId)

    res.status(200).json({
      success: true,
      msg: "Find Product Success",
      product: product,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const searchProduct = async (req, res) => {
  try {
    const pageNumber = req.query.page || 1;
    const keyword = req.query.keyword || "";
    const options = {
      page: pageNumber,
      limit: 16,
      projection: { name: 1, price: 1, url_thumbnail: 1, brand: 1, category_name: 1 }
    };

    const query = { $text: { $search: keyword } };
    const result = await Product.paginate(query, options);
    const productsSearch = result.docs
    console.log(productsSearch);
    res.status(200).json({
      success: true,
      msg: "Find Product Search Success",
      productsSearch: productsSearch,
      numberPage: result.totalPages
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};