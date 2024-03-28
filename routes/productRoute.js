import express from "express";
import { getAllProduct, getProduct, searchProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/search", searchProduct);
router.get("/:productId", getProduct);
router.get("/", getAllProduct);


export default router;
