import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    pname: {
        type: String,
        required: true,
        trim: true
    },

    pdescription: {
        type: String,
        required: true,
        trim: true
    },

    pcategory: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category"
    },

    psubcategory: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "SubCategory"
    },

    pimage: [{
        type: "String",
        required: true,
    }],

    pprice: {
        type: Number,
        required: true,
    },

    pdiscount: {
        type: Number,
        required: false,
    },

    pstock: {
        type: Number,
        required: true,
    },
    psize: {
        type: String,
        trim: true,
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export const Product = mongoose.model("Product", productSchema);
export default Product;
