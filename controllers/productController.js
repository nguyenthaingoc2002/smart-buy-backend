import Product from "../models/products.js";
import axios from "axios";

export const getAllProduct = async (req, res) => {
  try {
    const pageNumber = req.query.page || 1;
    const options = {
      page: pageNumber,
      limit: 18,
      projection: {
        name: 1,
        price: 1,
        url_thumbnail: 1,
        brand: 1,
        category_name: 1,
        e_commerce: 1,
        url_product: 1,
      },
    };
    const result = await Product.paginate({}, options);
    const allProducts = result.docs;
    res.status(200).json({
      success: true,
      msg: "Find All Product Success",
      allProducts: allProducts,
      numberPage: result.totalPages,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    res.status(200).json({
      success: true,
      msg: "Find Product Success",
      product: product,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSimilarProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const response = await axios.get(`http://127.0.0.1:8000/products/${productId}`);
    const response_data = response.data
    if(response_data.code == 200) {
      const list_product_id_similar = response_data.list_product_id_similar
      console.log(list_product_id_similar);
      const listProducts = await Product.find(
        {
          id: {
            $in: [
              ...list_product_id_similar
            ],
          },
        }
      );

      res.status(200).json({
        success: true,
        msg: "Find Product Success",
        listProducts: listProducts,
      });
    } else {
      throw new Error('Machine learning sever error');
    }


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
      limit: 18,
      projection: {
        name: 1,
        price: 1,
        url_thumbnail: 1,
        brand: 1,
        category_name: 1,
        e_commerce: 1,
      },
    };

    const query = { $text: { $search: keyword } };
    const result = await Product.paginate(query, options);
    const productsSearch = result.docs;
    console.log(productsSearch);
    res.status(200).json({
      success: true,
      msg: "Find Product Search Success",
      productsSearch: productsSearch,
      numberPage: result.totalPages,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
