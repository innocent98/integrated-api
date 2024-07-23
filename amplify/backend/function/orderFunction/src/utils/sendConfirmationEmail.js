const { confirmationEmailReceiver } = require("../config/new_order_receiver");
const { confirmationEmailSender } = require("../config/new_order_sender");

const sendConfirmationEmails = async (order) => {
  try {
    await confirmationEmailSender(
      order.senderEmail,
      order.senderName,
      order.trackingNo,
      order.pickupFrom,
      order.deliverTo
    );
    console.log("Sender confirmation email sent");

    await confirmationEmailReceiver(
      order.receiverEmail,
      order.receiverName,
      order.trackingNo,
      order.pickupFrom,
      order.deliverTo
    );
    console.log("Receiver confirmation email sent");
  } catch (emailError) {
    console.error("Error sending confirmation emails:", emailError);
  }
};

module.exports = { sendConfirmationEmails };
