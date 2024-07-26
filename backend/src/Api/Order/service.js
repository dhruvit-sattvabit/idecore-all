const axios = require("axios");
const auth = require("../authorization/user_auth");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const orderModel = require("./schema");
const jwt = require("jsonwebtoken");

async function verify(
  razorpay_payment_id,
  razorpay_order_id,
  razorpay_signature
) {
  const hmac = crypto.createHmac("sha256", "yE8s1lQinqDsAp3NgvEfak7a");
  const data = `${razorpay_order_id}|${razorpay_payment_id}`;
  hmac.update(data);
  const calculatedSignature = hmac.digest("hex");
  console.log("calculatedSignature : ", calculatedSignature);

  if (calculatedSignature !== razorpay_signature) {
    console.log("true");
    return res.status(400).json({ error: "Invalid signature" });
  }

  return true;
}

async function paymentDetails(razorpay_payment_id) {
  const apiKey = "rzp_test_SAgvhvFFYMzPAp";
  const apiSecret = "yE8s1lQinqDsAp3NgvEfak7a";

  const url = `https://api.razorpay.com/v1/payments/${razorpay_payment_id}`;
  const authHeader = `Basic ${Buffer.from(apiKey + ":" + apiSecret).toString(
    "base64"
  )}`;

  try {
    const paymentResponse = await axios.get(url, {
      headers: {
        Authorization: authHeader,
      },
    });

    return paymentResponse.data;
  } catch (error) {
    // Handle error
    throw error;
  }
}

async function updateData(data, paymentDetails) {
  console.log("data : ", data);
  const verifyUser = jwt.verify(
    data.user.replace("Bearer ", ""),
    "atuhjiokbvdftghyujgdefghyjbcfhhgds"
  );
  console.log("verifyUser : ", verifyUser);
  // const data = await orderModel({
  //     user :
  // })
}

module.exports = { verify, paymentDetails, updateData };
