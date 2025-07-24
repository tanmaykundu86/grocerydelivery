import Order from '../../models/order.js';
import Branch from '../../models/branch.js'
import { Customer, DeliveryPartner } from '../../models/user.js';

export const createOrder = async (req, reply) => {
    try {
        const userId = req.user;
        const { items, branch, totalPrice } = req.body;
        const customerData = await Customer.findById(userId);
        const branchData = await Branch.findById(branch);

        if (!customerData) {
            reply.status(500).send({ message: 'Customer not found' });
        }
        const newOrder = new Order({
            customer: userId,
            items: items.map(item => ({
                id: item.id,
                item: item.id,
                count: item.id,
            })),
            branch,
            totalPrice,
            deliveryLocation: {
                latitude: customerData.liveLocation.latitude,
                longitude: customerData.liveLocation.longitude,
                address: customerData.liveLocation.address || "No Address Found",
            },
            pickupLocation: {
                latitude: branch.liveLocation.latitude,
                longitude: branch.liveLocation.longitude,
                address: branch.liveLocation.address || "No Address Found",
            }
        });

        const saveOrder = await newOrder.save()
        return reply.status(201).send(saveOrder);
    } catch (error) {
        reply.status(500).send({ message: 'An error occurred', error });
    }
}

export const confirmOrder = async (req, reply) => {
    try {
        const { orderId } = req.params;
        const { userId } = req.user;
        const { deliveryPersonLocation } = req.body;
        const deliveryPerson = await DeliveryPartner.findById(userId);
        if (!deliveryPerson) {
            reply.status(500).send({ message: 'Delivery Person not found' });
        }
        const orderData = await Order.findById(orderId);
        if (!orderData) {
            reply.status(500).send({ message: 'Order not found' });
        }
        orderData.status = "confirmed";
        orderData.deliveryPartner = userId;
        orderData.deliveryLocation = {
            latitude: deliveryPersonLocation.liveLocation.latitude,
            longitude: deliveryPersonLocation.liveLocation.longitude,
            address: deliveryPersonLocation.liveLocation.address || "No Address Found",
        }

        req.server.io.to(orderId).emit('orderConfirmed', orderData);
        await orderData.save();
        return reply.status(201).send(orderData);
    } catch (error) {
        reply.status(500).send({ message: 'An error occurred', error });
    }
}

export const updateOrderStatus = async (req, reply) => {
    try {
        const { orderId } = req.params;
        const { status, deliveryPersonLocation } = req.body;
        const { userId } = req.user;

        const deliveryPerson = await DeliveryPartner.findById(userId);
        if (!deliveryPerson) {
            reply.status(500).send({ message: 'Delivery Person not found' });
        }
        const orderData = await Order.findById(orderId);
        if (!orderData) {
            reply.status(500).send({ message: 'Order not found' });
        }

        if (["cancelled", "delivered"].includes(orderData.status)) {
            reply.status(400).send({ message: 'Order can not found' });
        }
        if (orderData.deliveryPartner.toString() !== userId) {
            reply.status(403).send({ message: 'Unauthorized' });
        }
        orderData.status = status;
        orderData.deliveryLocation = deliveryPersonLocation;
        await orderData.save();

        req.server.io.to(orderId).emit('LiveTrackingUpdate', orderData);
        return reply.status(201).send(orderData);

    } catch (error) {
        reply.status(500).send({ message: 'Failed to update order status', error });
    }
}

export const getOrders = async(req, reply)=> {
    try {
        const {status, customerId, deliveryPartnerId, branchId} = req.query;
        let query = {};

        if (status) query.status = status;
        if (customerId) query.customer = customerId;
        if (deliveryPartnerId) {
            query.deliveryPartner = deliveryPartnerId;
            query.branch = branchId;
        }

        const orders = await Order.find(query).populate(
            "customer, branch, items.item deliveryPartner"
        );

        return reply.send(orders);
    } catch (error) {
        reply.status(500).send({ message: 'Failed to update order status', error });
    }
}

export const getOrderById = async(req, reply)=> {
    try {
        const {orderId} = req.params;

        const order = await Order.findById(orderId).populate(
            "customer, branch, items.item deliveryPartner"
        );

        return reply.send(order);
    } catch (error) {
        reply.status(500).send({ message: 'Failed to update order status', error });
    }
}