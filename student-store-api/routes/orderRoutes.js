const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.get("/:customer_id", orderController.getOrderByCustomerId);
router.post("/", orderController.createOrder);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);

router.post("/:order_id", orderController.addOrderItem);
router.get("/:order_id/total", orderController.getOrderTotalPrice);

module.exports = router;