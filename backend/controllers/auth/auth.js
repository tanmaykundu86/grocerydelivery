import { Customer, DeliveryPartner } from "../../models/user.js";
import jwt from "jsonwebtoken";

const generateTokens = (user) => {
    const accesToken = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.ACSESS_TOKEN_SECRET,
        { expiresIn: '1d' }
    )

    const refressToken = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )

    return { accesToken, refressToken }
}

export const loginCustomer = async (req, reply) => {
    try {
        const { phone } = req.body;
        let customer = await Customer.findOne({ phone });

        if (!customer) {
            customer = new Customer({
                phone,
                role: "Customer",
                isActivated: true
            });
            customer.save();
        }
        const { accesToken, refressToken } = generateTokens(customer);
        return reply.send({
            message: customer ? "Login succesful" : "Customer created and logged in",
            accesToken,
            refressToken,
            customer
        })
    } catch (error) {
        reply.status(500).send({ message: 'An error occurred', error });
    }
}

export const loginDeliveryPartner = async (req, reply) => {
    try {
        const { email, password } = req.body;
        let deliveryPartner = await DeliveryPartner.findOne({ email });

        if (!deliveryPartner) {
            reply.status(500).send({ message: 'Delivery Partner not found' });
        }
        const isMatch = password === deliveryPartner.password
        if (!isMatch) {
            reply.status(500).send({ message: 'Invalid Credintials' });
        }

        const { accesToken, refressToken } = generateTokens(deliveryPartner);
        return reply.send({
            message: "Login succesful",
            accesToken,
            refressToken,
            deliveryPartner
        })
    } catch (error) {
        reply.status(500).send({ message: 'An error occurred', error });
    }
}

export const refreshToken = async (req, reply) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        reply.status(500).send({ message: 'Refresh token required' });
    }
    try {
        const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        let user;
        if (decode.role === 'Customer') {
            user = await Customer.findById(decode.userId)
        } else if (decode.role === 'DeliveryPartner') {
            user = await DeliveryPartner.findById(decode.userId);
        } else {
            reply.status(500).send({ message: 'Invalid role' });
        }
        const { accesToken, refreshToken: newRefreshToken } = generateTokens(user);
        return reply.send({
            message: "Token Refresh",
            accesToken,
            refreshToken: newRefreshToken,
        });
    } catch (error) {
        reply.status(500).send({ message: 'An error occurred', error });
    }
}

export const fetchUser = async (req, reply) => {
    try {
        const { userId, role } = req.user;
        let user;
        if (decode.role === 'Customer') {
            user = await Customer.findById(userId)
        } else if (decode.role === 'DeliveryPartner') {
            user = await DeliveryPartner.findById(userId);
        } else {
            reply.status(500).send({ message: 'Invalid role' });
        }
        if (!user) {
            reply.status(500).send({ message: 'User not found' });
        }
        return reply.send({
            message: "User fetch succesfully",
            user,
        });
    } catch (error) {
        reply.status(500).send({ message: 'An error occurred', error });
    }
}