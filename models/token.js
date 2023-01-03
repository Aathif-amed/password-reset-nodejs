const mongoose = require("mongoose");
const schema = mongoose.Schema;
const joi = require("joi");


const tokenSchema = new schema({
  userId: {
    type: schema.Types.ObjectId,
    required: true,
    ref:"user"
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires:3600
  },
});

module.exports=mongoose.model("token",tokenSchema)