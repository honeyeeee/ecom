import mongoose from "mongoose";

/**
 * MongoDB Cart collection
 * Ek user + ek product + ek size + ek color = ek document (unique index). Quantity alag field.
 * Server read: `Home_page/page.js` → getCartFromDb → Cart.find({ userId }).populate('productId')
 */

const cart = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Prod",
  },
  quantity: {
    type: Number,
    default: 1,
  },
  // Variant selection — same product alag size/color par alag cart line
  size: {
    type: String,
    default: "",
    trim: true,
  },
  color: {
    type: String,
    default: "",
    trim: true,
  },
  // Frontend se bheja product image URL — cart UI populate ke bina bhi dikha sake
  imageUrl: {
    type: String,
    default: "",
    trim: true,
  },
});

// Same user + product + size + color = ek hi line (duplicate par API increment kare)
// Alag size/color → nayi line banegi
cart.index(
  {
    userId: 1,
    productId: 1,
    size: 1,
    color: 1,
  },
  {
    unique: true,
  }
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", cart);
export default Cart;