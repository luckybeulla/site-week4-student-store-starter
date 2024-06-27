const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Order {
    static  getAllOrders = async() => {
        return prisma.order.findMany();
    };

    static getOrderById = async (order_id) => {
        return prisma.order.findUnique({
            where: { order_id: parseInt(order_id) },
            include: { order_items: true }
        });
    };

    static getOrderByCustomerId = async(customer_id) => {
        return prisma.order.findUnique({where: {customer_id: parseInt(customer_id)}});
    };

    static createOrder = async(orderData) =>{
        const products = await prisma.product.findMany({
            where: {
                id: { in: orderData.order_items.map((item) => item.product_id) },
            }
        })
        const createdItems = orderData.order_items.map((item) => {          
            const product = products.find((product) => product.id === item.product_id);
            return {
                product_id: item.product_id,
                quantity: item.quantity,
                price: parseFloat(product.price) * parseInt(item.quantity)
            }
        });
        console.log("created items: ", createdItems);

        return prisma.order.create({
            data: {
                customer_id: orderData.customer_id,
                total_price: orderData.total_price,
                status: orderData.status,
                order_items: {
                    create: createdItems
                }
            }});
    };

    static updateOrder = async(order_id, orderData) => {
        return prisma.order.update({
            where: {order_id: parseInt(order_id)},
            data: orderData,
        });
    };

    static deleteOrder = async (order_id) => {
        return prisma.order.delete({where: {order_id: parseInt(order_id)}});
    };

    static calculateTotalPrice = async (order_id) => {
        const order = await this.getOrderById(order_id);
        if (!order){
            throw new Error("Order not found");
        }

        const totalPrice = order.order_items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
        console.log(totalPrice);

        return totalPrice;
    };
};

module.exports = Order;