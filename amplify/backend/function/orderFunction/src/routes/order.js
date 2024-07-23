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

module.exports = router;
