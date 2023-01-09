const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
     object_name:{ type: String, required:true},
     desc: { type: String},
     RAM:{ type:String },
     InStorage: { type:String },
     Screen_size:{ type:String},
     weight:{ type:String},
     camera:{ type:Number},
     battery:{type:String},
     colour:{ type:String}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
