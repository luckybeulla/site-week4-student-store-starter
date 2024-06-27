const Product = require("../models/product");

const getAllProducts = async(req, res) => {
    const {category, sort, price_min, price_max} = req.query;
    let filter = {};
    let orderBy = {};

    if (category){
        filter.category = {
            contains: category,
            mode: 'insensitive'
        };
    };

    if (price_min){
        filter.price = {...filter.price, gte: parseFloat(price_min)};
    }

    if (price_max){
        filter.price = {...filter.price, lte: parseFloat(price_max)};
    }

    if (sort == "name") {
        orderBy = {name: sort === "desc" ? "desc": "asc"};
    } else if (sort == "price"){
        orderBy = {price: sort === "desc" ? "desc": "asc"};
    };

    try {
        const product = await Product.getAllProducts(filter, orderBy);
        res.status(200).json(product);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
};

const getProductById = async (req,res) => {
    try{
        const product = await Product.getProductById(req.params.id);
        if (product) {
            res.status(200).json(product);
        }else{
            res.status(404).json({error: "Product not found"});
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const createProduct = async (req, res) => {

    try {
        const newProduct = await Product.createProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateProduct = async(req, res) => {
    try{
        const updateProduct = await Product.updateProduct(req.params.id, req.body);
        if (updateProduct) {
            res.status(200).json(updateProduct);
        } else{
            res.status(404).json({error: "Product not found"});
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const deleteProduct = async(req,res) => {
    try{
        const deleteProduct = await Product.deleteProduct(req.params.id);
        if (deleteProduct) {
            res.status(200).json(deleteProduct);
        } else {
            res.status(404).json({error: "Product not found"});
        }
    } catch (error){
        res.status(400).json({error: error.message});
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};