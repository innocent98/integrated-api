const router = require("express").Router();
const Order = require("../models/Order");
const { generateUniqueTrackingNo } = require("../utils/uniqueNumber");
const { sendConfirmationEmails } = require("../utils/sendConfirmationEmail");

// create order
router.post("/create_order", async (req, res) => {
  try {
    const trackingNo = await generateUniqueTrackingNo();

    const {
      pickupFrom,
      deliverTo,
      senderName,
      senderEmail,
      receiverName,
      receiverEmail,
      ...orderData
    } = req.body;

    const newOrder = new Order({
      trackingNo: `ICS-${trackingNo?.slice(0, 13)}`,
      currentLocation: pickupFrom,
      deliverTo,
      senderName,
      senderEmail,
      receiverName,
      receiverEmail,
      pickupFrom,
      ...orderData,
    });

    const savedOrder = await newOrder.save(); 

    await sendConfirmationEmails(newOrder);

    res.status(200).json(savedOrder);
  } catch (err) {
    console.log("err", err);
    res.status(500).json("Connection error!");
  }
});

// update an order
router.put("/create_order/:id", async (req, res) => {
  try {
    const { ...orderData } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: { ...orderData } },
      { new: true }
    );

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json("No order found!");
    }
  } catch (err) {
    console.log("err", err);
    res.status(500).json("Connection Error");
  }
});

// get all orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();

    if (orders.length > 0) {
      res.status(200).json(orders);
    } else {
      res.status(404).json("No order found!");
    }
  } catch (err) {
    res.status(500).json("Connection Error");
  }
});

// get single order
router.get("/orders/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json("No order found!");
    }
  } catch (err) {
    console.log("err", err);
    res.status(500).json("Connection Error");
  }
});

// get order status
router.post("/order_status", async (req, res) => {
  try {
    const { trackingNo } = req.body;

    const order = await Order.findOne({ trackingNo: trackingNo });

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json("Record not found!");
    }
  } catch (err) {
    console.log("err", err);
    res.status(500).json("Connection Error");
  }
});

module.exports = router;
