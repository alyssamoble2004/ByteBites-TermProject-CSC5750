import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

//save order to database
router.post("/", async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json({ message: "Order placed successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//get order history for a specific user
router.get("/:userEmail", async (req, res) => {
    try {
        const orders = await Order.find({ userEmail: req.params.userEmail
    }).sort({ date: -1 });
    
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;