import { Customer, DeliveryPartner } from "../../models/user.js";

export const updateUser = async (req, reply) => {
    try {
        const { userId } = req.user;

        let user = await Customer.findById(userId) || await DeliveryPartner.findById(userId);
        if (!user) {
            reply.status(500).send({ message: 'User not found' });
        }

        let UserModel;
        if (user.role === "Customer") {
            UserModel = Customer;
        } else if (user.role === "DeliveryPartner") {
            UserModel = DeliveryPartner;
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            reply.status(500).send({ message: 'User updated', updatedUser });
        }
        reply.status(500).send({ message: 'User not found' });
    } catch (error) {
        reply.status(500).send({ message: 'An error occurred', error });
    }
}