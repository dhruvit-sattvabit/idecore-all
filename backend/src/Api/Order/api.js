const express = require("express");
const router = new express.Router();
const orderModel = require("./schema");
const auth = require("../authorization/user_auth");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const orderController = require("./conroller");

router.route("/checkout").post(auth, orderController.checkout);

router.route("/paymentVerification").post(orderController.payment_verfication);

module.exports = router;
