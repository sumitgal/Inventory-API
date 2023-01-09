const router = require("express").Router();
const product = require("../models/product");
const Product = require("../models/product");
router.get('/',(req,res)=>{
    res.send("Welcome to Product");
})

//CREATE
router.post("/add", async (req, res) => {
    const newProduct = new Product(req.body);
  
    try {
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //UPDATE
router.put("/update", async (req, res) => {
    try {
      const updatedProduct = await Product.findOneAndUpdate(
        req.body.object_name,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //DELETE

  router.delete("/delete", async (req, res) => {
    try {
      await Product.findOneAndDelete({object_name: req.body.object_name});
      res.status(200).json("Product has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // TO FIND SOME PRODUCT
  router.post('/find', async (req, res) => {
    try{
        const user = await Product.findOne(
            {
                object_name: req.body.object_name
            }
        );
        !user && res.status(401).json("Wrong Name");
        res.status(200).json(user);
        res.end();
  }catch(err){
        res.status(500).json(err);
    }

  });
    

  
  //GET ALL PRODUCTS
  router.get("/allProducts", async (req, res) => {
    const qsort = req.query.sortit;
    try {
      let products;
  
      if (qsort==1 || qsort==-1) {
        products = await Product.find().sort({ createdAt: qsort });
        console.log("Sorted");
      } 
    
      else {
        console.log("else");
        products = await Product.find();
      }
  
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  });
 

  router.get("/allProducts/filter", async (req, res) => {
       try{
          
        let products;
             let match={};
             var f=0;
             if(req.query.object_name)
             { f=1;
                match.object_name = new RegExp(req.query.object_name,"i");
             }
             else if(req.query.RAM)
             {  f=1;
                console.log("yes");
                match.RAM = new RegExp(req.query.RAM,"i");
             }
            else if(req.query.Screen_size)
             {   f=1;
                match.Screen_size = new RegExp(req.query.Screen_size,"i");
             }
             if(f)
             {
                products = await Product.aggregate([{ $match:match}]);
                
             }
             else{
                products = await Product.find();
             }

             res.status(200).json(products);
             
       }
       catch (err)
       {
        res.status(500).json(err);
       }
  })


  module.exports = router;