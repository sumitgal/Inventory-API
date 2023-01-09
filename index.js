const WELCOME = function () {
          
    console.log('Welcome to Mobile inventory');
}
WELCOME();
const express = require('express');
const mongoose = require('mongoose');
const productRoute = require("./route/product");
const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://sumit:sumit@cluster0.mpxjjuz.mongodb.net/?retryWrites=true&w=majority").then(()=>{ console.log("DataBase successful");}).catch((err) => {
    console.log("getting error");})


app.use("/api/products", productRoute);

app.get("/" , (req,res) => {
    res.send("url_sucessful  " + "  Enter api urls");
});

app.listen( 5000, () => {
    console.log("Backend server is running!"); 
  });
