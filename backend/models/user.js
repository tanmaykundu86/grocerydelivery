import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String, required: true, trim: true
    },
    email: {
        type: String, required: true, unique: true
    },
    phone: {
        type: Number, required: true, unique: true
    },
    password: {
        type: String, required: true, minlength: [8, "Password is too weak."], select: false
    },
    address: [{
        flatNumber: "String", street: "String", locality: "String", city: "String", state: "String", country: "String", pincode: Number
    }],
    role: {
        type: String, enum: ["Customer", "Admin", "DeliveryPartner"], required: true,
    },
    createdAt: {
        type: Date, default: Date.now()
    },
    verified: {
        type: Boolean, default: false,
    },
    isActivated: {
        type: Boolean, default: false
    },
    otp: Number,
    otp_expiry: Date,
    reset_otp: Number,
    reset_otp_expiry: Date,
})

//Note:if you are using mongoDB compass, TTL index will not work.
//there you have to create this index manually in collection by selecting column name, its type & other options...
//userSchema.index({ otp_expiry: 1 }, { expireAfterSeconds: 0 });

const customerSchema = new mongoose.Schema({
    ...userSchema.obj,
    role: {
        type: String, enum: ["Customer"], default: "Customer",
    },
    liveLocation: {
        latitude: {type: Number}, longitude: {type: Number}
    }
});

const deliveryPartnerSchema = new mongoose.Schema({
    ...userSchema.obj,
    role: {
        type: String, enum: ["DeliveryPartner"], default: "DeliveryPartner",
    },
    liveLocation: {
        latitude: {type: Number}, longitude: {type: Number}
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
    }
});

const adminSchema = new mongoose.Schema({
    ...userSchema.obj,
    role: {
        type: String, enum: ["Admin"], default: "Admin",
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
    }
});

export const Customer = mongoose.model("Customer", userSchema);
export const DeliveryPartner = mongoose.model("DeliveryPartner", deliveryPartnerSchema);
export const Admin = mongoose.model("Admin", adminSchema);
export default { Customer, DeliveryPartner, Admin};
