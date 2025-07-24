import mongoose from "mongoose";

const storeDiscountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    discount: {
        type: Number,
        required: true,
    },
    status: {
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

export const StoreDiscount = mongoose.model("StoreDiscount", storeDiscountSchema);
export default StoreDiscount;
