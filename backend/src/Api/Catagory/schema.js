const mongoose = require("mongoose");
const validator = require("validator");

const catagorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, minlength: 5, required: true },
  tags: [{ type: String }],
});

const catagoryModel = new mongoose.model("Catagory", catagorySchema);

module.exports = catagoryModel;
