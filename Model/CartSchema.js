import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 4,
  },
  desc: {
    type: String,
    required: true,
    minlength: 8,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,

  }
});

const userCartSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  orders: [cartItemSchema]
}, { timestamps: true });

const UserCart = mongoose.model('UserCart', userCartSchema);

export default UserCart;
