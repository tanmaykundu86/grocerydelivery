import Product from "../../models/product.js";

export const getProductBySubCategory = async(req, reply) => {
    const {subCategoryId} = req.params;

    try {
        const products = await Product.find({psubcategory: subCategoryId})
        .select("-psubcategory")
        .exec();
        return reply.send(products);
    } catch (error) {
        reply.status(500).send({ message: 'An error occurred', error });
    }
}