import mongoose from "mongoose";

/**
 * MongoDB Cart collection
 * Ek user + ek product = ek document (unique index). Quantity alag field.
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
});

// Same product dobara add → duplicate error (API ko upsert/increment handle karna chahiye)
cart.index(
  {
    userId: 1,
    productId: 1,
  },
  {
    unique: true,
  }
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", cart);
export default Cart;