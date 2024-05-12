import express from "express";
import { getAllProduct, getProduct, getSimilarProduct, searchProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/search", searchProduct);
router.get("/:productId/similar", getSimilarProduct);
router.get("/:productId", getProduct);
router.get("/", getAllProduct);


export default router;
