const mongoose = require("mongoose");


const ShoesSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
   },
   desc: {
      type: String,
      required: true,
   },
   price: {
      type: Number,
      required: true,
   },
   mainImg: {
      type: String,
      required: true,
   },
   images: {
      type: Array,
   },
   colors: {
      type: Array,
   },
   size: {
      type: Array,
   },
})




const ShoesModel = mongoose.model("Shoes", ShoesSchema);

module.exports = ShoesModel;