import UserCart from "../Model/CartSchema.js";
import dotenv from "dotenv";
dotenv.config();

import a from "stripe";
const stripe = a(
  "pk_test_51LvdGASGXtUoYRLzUHg0K0Vo4XcpgyFaW2YTBQEpBnfkcAhSgavP54nB53cGCPIZUyNoPntPmwmE73FJbHyAxlqq00UW0KQyqb"
);

class userCartSchema {
  constructor() {}

  static addToCart = async (req, res) => {
    console.log(req.body, "reqq");
    const { email, title, quantity, image, desc, price, category } = req.body;

    try {
      // Convert quantity to number
      const parsedQuantity = parseInt(quantity);

      if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
        return res
          .status(400)
          .json({ error: "Quantity must be a positive number" });
      }

      // Check if user's cart already exists
      let userCart = await UserCart.findOne({ email });

      // If user cart doesn't exist, create a new one
      if (!userCart) {
        userCart = new UserCart({
          email,
          orders: [
            { title, image, desc, price, category, quantity: parsedQuantity },
          ],
        });
      } else {
        // Check if the product already exists in the cart
        const existingProduct = userCart.orders.find(
          (item) => item.title === title
        );

        // If product exists, update its quantity
        if (existingProduct) {
          existingProduct.quantity += parsedQuantity;
        } else {
          // If product doesn't exist, add it to the cart
          userCart.orders.push({
            title,
            image,
            desc,
            price,
            category,
            quantity: parsedQuantity,
          });
        }
      }

      // Save the updated cart to the database
      const savedCart = await userCart.save();
      res.status(200).json({
        message: "Product added to cart successfully",
        cartdata: savedCart,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  static getCartData = async (req, res) => {
    try {
      const { email } = req.params;

      const response = await UserCart.findOne({ email: email });

      if (response) {
        res.status(202).json({ cartdata: response });
      } else {
        res.status(402).json({ message: " user not found " });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  };

  static removeCartProduct = async (req, res) => {
    try {
      console.log(req.body.email, "body");
      const { id } = req.params;
      let email = req.body.email;

      const userCart = await UserCart.findOne({ email });

      if (userCart) {
        const filteredProducts = userCart.orders.filter(
          (ele) => ele._id.toString() !== id
        );
        if (filteredProducts) {
          userCart.orders = filteredProducts;
          await userCart.save();
          console.log(id, "this is id");
          res.status(202).json({ message: "Deleted successfully", id: id });
        } else {
          res.status(402).json({ message: "Product not found or not deleted" });
        }
      } else {
        res.status(404).json({ message: "User not founddddd" });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  };

  static removeAllCart = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await UserCart.findByIdAndDelete({ _id: id });
      if (result) {
        res.status(202).json({ message: "Deleted successfully", result : [] });
      } else {
        res.status(404).json({ message: "Not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
}

export default userCartSchema;
