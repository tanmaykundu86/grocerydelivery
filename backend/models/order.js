import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        unique: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    deliveryPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliveryPartner',
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true,
    },
    items: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        count: {
            type: Number,
            required: true,
        }
    }],
    deliveryLocation: {
        latitude: {type: Number}, 
        longitude: {type: Number},
        address: {type: String}
    },
    pickupLocation: {
        latitude: {type: Number}, 
        longitude: {type: Number},
        address: {type: String}
    },
    deliveryPersonLocation: {
        latitude: {type: Number}, 
        longitude: {type: Number},
        address: {type: String}
    },
    totalPrice: {
        type: Number,
        required: true
    },
    discountAmount: {
        type: Number,
    },
    status: {
        type: String,
        enum: ["available", "confirmed", "arriving", "delivered", "cancelled", "refund"],
        default: "available"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})

async function getNextSequenceValue(sequenceName) {
    const sequenceDocument = await Counter.findOneAndUpdate(
        {name: sequenceName},
        {$inc: {sequence_value: 1}},
        {new: true, upsert: true},
    );
    return sequenceDocument.sequence_value;
}

orderSchema.pre('save', async function name(next) {
    if (this.isNew) {
        const sequenceValue = await getNextSequenceValue("orderId");
        this.orderId = `OD${sequenceValue.toString().padStart(6,'0')}`;
    }
    next();
})
export const Order = mongoose.model("Order", orderSchema);

export default Order;