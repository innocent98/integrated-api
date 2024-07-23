const Order = require("../models/Order");
const crypto = require("crypto");

const generateUniqueTrackingNo = async () => {
  let trackingNo;
  let isUnique = false;

  while (!isUnique) {
    trackingNo = crypto.randomUUID();

    // Check if the code already exists in the database
    const existingUser = await Order.findOne({ trackingNo });

    if (!existingUser) {
      isUnique = true;
    }
  }

  return trackingNo;
};

module.exports = { generateUniqueTrackingNo };
