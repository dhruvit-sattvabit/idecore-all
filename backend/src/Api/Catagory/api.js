const catagoryModel = require("./schema");
const express = require("express");
const router = express.Router();

router.post("/catagory", async (req, res) => {
  try {
    // console.log(req.body);
    const user = await catagoryModel(req.body);
    const creatUser = await user.save();
    return res.send({
      data: user,
      code: 200,
      message: "saved succesfully",
    });
  } catch (e) {
    return res.send({
      data: e,
      code: 400,
      message: "error",
    });
  }
});

router.get("/catagory", async (req, res) => {
  try {
    // console.log(req.body);
    const user = await catagoryModel.find();
    return res.send({
      data: user,
      code: 200,
      message: "get succesfully",
    });
  } catch (e) {
    return res.send({
      data: e,
      code: 400,
      message: "error",
    });
  }
});

router.get("/catagory/:id", async (req, res) => {
  try {
    const user = await catagoryModel.findById(req.params.id);
    return res.send({
      data: user,
      code: 200,
      message: "get succesfully",
    });
  } catch (e) {
    return res.send({
      data: e,
      code: 400,
      message: "error",
    });
  }
});

router.patch("/catagory/:id", async (req, res) => {
  try {
    const user = await catagoryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    return res.send({
      data: user,
      code: 200,
      message: "update succesfully",
    });
  } catch (e) {
    return res.send({
      data: e,
      code: 400,
      message: "error",
    });
  }
});

router.delete("/catagory/:id", async (req, res) => {
  try {
    const user = await catagoryModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.send({
        data: user,
        code: 400,
        message: "catagory not found",
      });
    } else {
      return res.send({
        data: user,
        code: 200,
        message: "delete succesfully",
      });
    }
  } catch (e) {
    return res.send({
      data: e,
      code: 400,
      message: "error",
    });
  }
});
module.exports = router;
