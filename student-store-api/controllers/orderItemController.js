const OrderItem = require('../models/orderItem');

const orderItemController = {
    getAllOrderItems: async (req, res) => {
        try {
            const orderItems = await OrderItem.getAllOrderItems(req.query);
            res.status(200).json(orderItems);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getOrderItemById: async (req, res) => {
        const { id } = req.params;
        try {
            const orderItem = await OrderItem.getOrderItemById(id);
            if (!orderItem) {
                return res.status(404).json({ error: 'Order item not found' });
            }
            res.status(200).json(orderItem);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createOrderItem: async (req, res) => {
        try {
            const { order_id } = req.params;
            const orderItem = await OrderItem.createOrderItem(order_id, req.body);
            res.status(201).json(orderItem);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateOrderItem: async (req, res) => {
        const { id } = req.params;
        try {
            const updatedOrderItem = await OrderItem.updateOrderItem(id, req.body);
            res.status(200).json(updatedOrderItem);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteOrderItem: async (req, res) => {
        const { id } = req.params;
        try {
            await OrderItem.deleteOrderItem(id);
            res.status(204).json({ message: 'Order item deleted' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = orderItemController;
