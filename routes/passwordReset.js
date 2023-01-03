const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const joi = require("joi");
const crypto = require("crypto");
const express = require("express");
const { user } = require("../models/users");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const schema = joi.object({
      email: joi.string().email().required(),
    });

    const {error} = schema.validate(req.body);
    if (error) {
      console.log(error);
      return res.status(401).send(error);
    }

    const User = await user.findOne({ email: req.body.email });
console.log(User,"aaaa");

    if (!User) {
      console.log("User not Found");
      return res.status(401).send("User not Found");
    }

    let token = await Token.findOne({ userId: User._id });
    if (!token) {
      token = await new Token({
        userId: User._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }

    const link = `${process.env.BASE_URL}/password-reset/${User._id}/${token.token}`;
    await sendEmail(User.email, "Password-reset-Link", link);

    return res.status(200).send("reset link sent");
  } catch (error) {
    console.log(error);
    return res.status(401).send(error, "reset error");
  }
});

router.post("/:userId/:token", async (req, res) => {
  try {
    const schema = joi.object({
      password: joi.string().required(),
    });

    const {error} = schema.validate(req.body);
    if (error) {
      console.log(error.details[0].message);
      return res.status(401).send(error.details[0].message);
    }

    const User = await user.findById(req.params.userId);
    if (!User) {
      console.log("User not Found");
      return res.status(401).send("Invalid Link");
    }

    const token = await Token.findOne({
      userId: User._id,
      token: req.params.token,
    });
    if (!token) {
      return res.status(401).send("Invalid Link or token expired");
    }

    User.password = req.body.password;
    await User.save();
    await token.delete();
    return res.status(200).send("password reset successfull");
  } catch (error) {
    console.log(error);
    return res.status(401).send(error, "reset error -b");
  }
});

module.exports = router;
