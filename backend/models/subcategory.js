import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
    scname: {
        type: String,
        required: true,
        trim: true
    },
    scdescription: {
        type: String,
        trim: true
    },
    scimage: [{
        type: "String",
        required: true,
    }],
    scstatus: {
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

export const SubCategory = mongoose.model("SubCategory", subcategorySchema);
export default SubCategory;
