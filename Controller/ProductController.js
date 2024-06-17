import Product from "../Model/ProductSchema.js";

class Productclass {

  constructor() {}

  static getAllProduct = async (req, res) => {
    try {
      const products = await Product.find(req.query);
      return res.status(200).json(products);
    } catch (error) {
      console.error(error);
    }
  };

  static getOneProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      console.log(productId , "product id ")
      const product = await Product.findById({_id :productId});
      if (!product) {
        return res.status(500).json({ msg: "No product with such id!" });
      }

      return res.status(200).json({catProduct : product});
    } catch (error) {
      console.error(error);
      return res.status(400).json(error);
    }
  };


  static createProduct = async(req, res)=>{
       const{title , desc , price , image , review , category} = req.body
       
    try {
      const newProduct = new Product({
        title : title,
        desc : desc,
        price : price,
        image : image,
        review : review,
        image : image ,
        category : category
      }); // Use `new` instead of `create`
       const response = await newProduct.save(); // Save the new product to the database
      return res.json({ success : true ,productdata :response });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to create product" }); // Return appropriate response for error
  }

  }
}
export default Productclass
