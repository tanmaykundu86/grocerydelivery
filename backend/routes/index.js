
//import fastify from 'fastify';
import { authRoutes } from "./auth.js";
import { orderRoutes } from "./order.js";
import { categoryRoutes, productRoutes, subCategoryRoutes } from "./product.js";

const prefix = "/api/v1";

const registerRoutes = async (fastify) => {
    fastify.register(authRoutes, { prefix: prefix });
    fastify.register(productRoutes, { prefix: prefix });
    fastify.register(categoryRoutes, { prefix: prefix });
    fastify.register(subCategoryRoutes, { prefix: prefix });
    fastify.register(orderRoutes, { prefix: prefix });
};

export default registerRoutes;