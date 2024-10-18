const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUser: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    toUser: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["interest", "ignore", "pending","accept","reject"],
        message: "{VALUE} is not a valid status",
      },
      default: "pending",
    },
  },
  { timestamps: true }
);


connectionRequestSchema.pre("save", function(next){
  if(this.fromUser.equals(this.toUser)){
    const error= new Error ("you can't sent reques to your self")
    return next(error)
  }
  next()
})

const connectionRequest = mongoose.model(
  "connectionRequest",
  connectionRequestSchema
);


module.exports = connectionRequest;
