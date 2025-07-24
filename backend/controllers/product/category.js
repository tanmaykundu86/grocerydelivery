import Category from '../../models/category.js';
import SubCategory from '../../models/subcategory.js';

export const getAllCategories = async (req, reply) => {
    try {
        const categories = await Category.find();
        return reply.send(categories);
    } catch (error) {
        reply.status(500).send({ message: 'An error occurred', error });
    }
};

export const getAllSubCategories = async (req, reply) => {
    try {
        const subcategories = await SubCategory.find();
        return reply.send(subcategories);
    } catch (error) {
        reply.status(500).send({ message: 'An error occurred', error });
    }
};