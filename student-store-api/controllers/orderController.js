const Order = require("../models/orders");
const OrderItem = require("../models/orderItem");

const getAllOrders = async(req, res) => {
    try {
        const order = await Order.getAllOrders(req.query);
        res.status(200).json(order);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
};

const getOrderById = async (req,res) => {
    try{
        const order = await Order.getOrderById(req.params.id);
        if (order) {
            res.status(200).json(order);
        }else{
            res.status(404).json({error: "Order not found"});
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const getOrderByCustomerId = async (req,res) => {
    try{
        const order = await Order.getOrderByCustomerId(req.params.customer_id);
        if (order) {
            res.status(200).json(order);
        }else{
            res.status(404).json({error: "Order not found"});
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};


const createOrder = async (req, res) => {

    try {
        console.log(req.body);
        const newOrder = await Order.createOrder(req.body);
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateOrder = async(req, res) => {
    try{
        const updateOrder = await Order.updateOrder(req.params.id, req.body);
        if (updateOrder) {
            res.status(200).json(updateOrder);
        } else{
            res.status(404).json({error: "Order not found"});
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const deleteOrder = async(req,res) => {
    try{
        const deleteOrder = await Order.deleteOrder(req.params.id);
        if (deleteOrder) {
            res.status(200).json(deleteOrder);
        } else {
            res.status(404).json({error: "Order not found"});
        }
    } catch (error){
        res.status(400).json({error: error.message});
    }
};

const addOrderItem = async (req, res) => {
    const {order_id} = req.params;
    try {
        const orderItem = await OrderItem.createOrderItem(order_id, req.body);
        res.status(201).json(orderItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getOrderTotalPrice = async (req, res) => {
    const {order_id} = req.params;
    try {
        const totalPrice = await Order.calculateTotalPrice(order_id);
        res.status(200).json({ total: totalPrice });
    } catch (error){
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    getOrderByCustomerId,
    createOrder,
    updateOrder,
    deleteOrder,
    addOrderItem,
    getOrderTotalPrice,
};
