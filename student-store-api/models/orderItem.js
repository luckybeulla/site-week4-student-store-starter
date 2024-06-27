const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class OrderItem {
    static async getAllOrderItems() {
        return await prisma.orderItems.findMany();
    }

    static async getOrderItemById(id) {
        return await prisma.orderItems.findUnique({
            where: { order_item_id: parseInt(id) },
        });
    }

    static async createOrderItem(order_id, data) {
        const product = await prisma.product.findUnique({
            where: {id: parseInt(data.product_id)}
        });

        console.log({order_id: parseInt(order_id), ...data});
        console.log(order_id);
        return await prisma.orderItems.create({
            data: {order_id: parseInt(order_id), price: parseFloat(product.price) * parseInt(data.quantity), ...data}
        });
    }
    // static async createOrderItem( order_id, data) {
    //     const product = await prisma.product.findUnique({
    //         where: {id: parseInt(data.product_id)}
    //     });

    //     console.log({order_id: parseInt(order_id), ...data});
    //     console.log(order_id);
    //     return await prisma.orderItems.create({
    //         data: {order_id: parseInt(data.order_id), price: parseFloat(product.price) * parseInt(data.quantity), ...data}
    //     });
    // }

    static async updateOrderItem(id, data) {
        return await prisma.orderItems.update({
            where: { order_item_id: parseInt(id) },
            data,
        });
    }

    static async deleteOrderItem(id) {
        return await prisma.orderItems.delete({
            where: { order_item_id: parseInt(id) },
        });
    }
}

module.exports = OrderItem;
