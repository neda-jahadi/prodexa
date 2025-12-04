import Product from '../models/product.model.js';
import mongoose from "mongoose";


export const getProducts =  async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products})
    } catch (error) {
        console.log('Error in fetching products:', error.message);
        res.status(500).json({success: false, message: 'Server Error'})
    }
}

export const getSingleProduct = async (req, res) => {
    const productId= req.params.id;

    try{
        const product = await Product.findById(productId);
        res.status(200).json({success: true, data: product})
    } catch (error) {
        console.error('Error in fetching product:', error.message);
        res.status(500).json({success: false, message: 'Product not found'})
    }
}

export const createSingleProduct = async (req, res) => {
    const product = req.body;

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: 'Please provide all fields'});
    }

    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct})
    } catch (error) {
        console.error('Error in Create Product:', error.message);
        res.status(500).json({success: false, message: 'Server Error'});
    }
}

export const deleteSingleProduct = async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: 'Invalid product Id'})
    }

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            res.status(404).json({success: false, message: 'Product not found'})
        }
        res.status(200).json({success: true, message: 'Product deleted'});

    } catch (error) {
        console.error('Error in Delete Product:', error.message);
        res.status(500).json({success: false, message: 'Server Error'});
    }
}

export const updateSingleProduct = async(req, res) => {
    const id = req.params.id;
    const editProduct = req.body;
    try {
        const product = await Product.findByIdAndUpdate(id, editProduct, {new: true});
        res.status(200).json({success: true, data: product})
    } catch (error) {
        console.error('Error in updating product:', error.message);
        res.status(500).json({success: false, message: 'Server Error'});
    }
}