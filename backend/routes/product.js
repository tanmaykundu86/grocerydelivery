
import { getAllCategories, getAllSubCategories } from "../controllers/product/category.js"; 
import { getProductBySubCategory } from "../controllers/product/product.js";

export const categoryRoutes = async (fastify, options) => {
    fastify.get("/categories", getAllCategories);
};
export const subCategoryRoutes = async (fastify, options) => {
    fastify.get("/sub-categories", getAllSubCategories);
};
export const productRoutes = async (fastify, options) => { 
    fastify.get("/produces/:categoryId", getProductBySubCategory);
};