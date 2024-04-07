const express = require("express");
const dontenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');
const ShoesModel = require("./models/Shoes");

const app = express()
app.use(express.json())
dontenv.config()
app.use(cors())
const port = process.env.PORT;
const uri = process.env.URL

app.post('/shoes', async (req, res) => {

   const newShoes = new ShoesModel({
      title: req.body.title,
      desc: req.body.desc,
      price: req.body.price,
      mainImg: req.body.mainImg,
      size: req.body.size,
      colors: req.body.colors,
      images: req.body.images
   })

   try {
      const savedHotel = await newShoes.save()
      res.status(200).json(savedHotel)
   } catch (err) {
      res.status(500).json(err)
   }
})
app.get('/shoes', async (req, res) => {
   const { color, price, size } = req.query


   try {
      if (color === "null" && price === "0" && size === "null") {

         Shoes = await ShoesModel.find()
      } else if (color !== "null" && price !== "0" && size !== "null") {
         console.log('213')

         Shoes = await ShoesModel.find({
            price: { $lte: price },
            colors: { $in: color },
            size: { $in: size }
         },)
      } else if (color !== "null" && price !== "0" && size === "null") {
         Shoes = await ShoesModel.find({
            price: { $lte: price },
            colors: { $in: color }
         },)
      } else if (color !== "null" && price === "0" && size !== "null") {
         Shoes = await ShoesModel.find({
            colors: { $in: color },
            size: { $in: size }
         },)
      } else if (color === "null" && price === "0" && size !== "null") {
         Shoes = await ShoesModel.find({
            size: { $in: size },
         },)
      }
      else if (color === "null" && price !== "0" && size === "null") {
         Shoes = await ShoesModel.find({
            price: { $lte: price },
         },)
      }
      else if (color !== "null" && price === "0" && size === "null") {
         Shoes = await ShoesModel.find({
            colors: { $in: color }
         },)
      } else {
         Shoes = await ShoesModel.find()
      }
      res.status(200).json(Shoes)
   } catch (err) {
      res.status(500).json(err)
   }
})
app.get('/shoes/:id', async (req, res) => {
   var id = req.params.id

   try {
      Cars = await ShoesModel.find({ "title": id.replace(/-/g, ' ') })
      res.status(200).json(Cars)
   } catch (err) {
      res.status(500).json(err)
   }
})
app.get('/shoesall', async (req, res) => {
   const { color, price, size } = req.query

   try {
      Shoes = await ShoesModel.find()
      res.status(200).json(Shoes)
   } catch (err) {
      res.status(500).json(err)
   }
})


const connect = async () => {
   try {
      await mongoose.connect(uri)
   } catch (err) {
      throw err
   }
}

app.use(express.json())
app.listen(port, () => {
   connect()
   console.log(`Server is running on 123port ${port}`);
});