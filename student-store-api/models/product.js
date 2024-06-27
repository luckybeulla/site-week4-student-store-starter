const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Product {
    static  getAllProducts = async(filter = {}, orderBy = {}) => {
        return prisma.product.findMany({
            where: filter,
            orderBy: orderBy
        });
    };

    static getProductById = async(id) => {
        return prisma.product.findUnique({where: {id: parseInt(id)}});
    };

    static createProduct = async(productData) => {
        return prisma.product.create({data: productData});
    };

    static updateProduct = async(id, productData) => {
        return prisma.product.update({
            where: {id: parseInt(id)},
            data: productData,
        });
    };

    static deleteProduct = async (id) => {
        return prisma.product.delete({where: {id: parseInt(id)}});
    };
};

module.exports = Product;