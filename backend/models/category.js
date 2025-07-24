import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    cname: {
        type: String,
        required: true,
        trim: true
    },
    cdescription: {
        type: String,
        trim: true
    },
    cimage: [{
        type: "String",
        required: true,
    }],

    cstatus: {
        type: Number,
        required: true,
        default: true,
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

export const Category = mongoose.model("Category", categorySchema);
export default Category;
