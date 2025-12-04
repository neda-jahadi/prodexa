import express from 'express';
import { createSingleProduct, deleteSingleProduct, getProducts, getSingleProduct, updateSingleProduct } from '../controllers/product.controller.js';

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getSingleProduct)
router.post("/", createSingleProduct)
router.delete("/:id", deleteSingleProduct)
router.put("/:id", updateSingleProduct)

export default router;