const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const confirmationEmailSender = async (
  email,
  senderName,
  trackinNo,
  pickupFrom,
  deliverTo
) => {
  console.log("Check");

  const message = {
    from: `"Integrated Courier Service" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Order Confirmation - Your Booking is Successful!",
    html: `<!DOCTYPE html>
      <html>
      <head>
        <title>Integrated Courier Service</title>
      </head>
      <body style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.5;">
          <div style="font-family: Arial, sans-serif; color: #333333; padding: 20px;">
              <h2 style="color: #4CAF50; text-align: center;">Order Confirmation</h2>
              <p style="font-size: 16px;">Dear ${senderName},</p>
              <p style="font-size: 16px;">Thank you for booking your delivery with Integrated Courier Service. We are pleased to inform you that your booking has been successfully processed.</p>
              <div style="border: 1px solid #e0e0e0; padding: 15px; border-radius: 5px; margin: 20px 0;">
                  <h3 style="color: #4CAF50;">Booking Details</h3>
                  <p style="font-size: 16px; margin: 5px 0;"><strong>Tracking Number:</strong> ${trackinNo}</p>
                  <p style="font-size: 16px; margin: 5px 0;"><strong>Pickup Address:</strong> ${pickupFrom}</p>
                  <p style="font-size: 16px; margin: 5px 0;"><strong>Delivery Address:</strong> ${deliverTo}</p>
              </div>
              <p style="font-size: 16px;">If you have any questions or need further assistance, please do not hesitate to contact our customer support team at <a href="mailto:support@example.com" style="color: #4CAF50;">support@example.com</a>.</p>
              <p style="font-size: 16px;">Thank you for choosing Integrated Courier Service!</p>
              <p style="font-size: 16px;">Best regards,<br>Integrated Courier Service Team</p>
              <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
              <p style="font-size: 12px; color: #999999; text-align: center;">This is an automated message, please do not reply.</p>
          </div>
      </body>
      </html>`,
  };

  try {
    const info = await transport.sendMail(message);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { confirmationEmailSender };
