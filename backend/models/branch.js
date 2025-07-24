import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
    name: {
        type: String, required: true, trim: true
    },
    liveLocation: {
        latitude: {type: Number}, longitude: {type: Number}
    },
    address: {
        type: String,
        trim: true,
        required: true,
    },
    deliveryPartners: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DeliveryPartner"
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export const Branch = mongoose.model("Branch", branchSchema);
export default Branch;
