/**
 * Client routes layout: har page par navbar + cart drawer
 * Cart data home par CartSync se aata hai; doosre pages par store purana reh sakta hai jab tak sync na ho
 */

import Navbar from "./Home_page/navbar";
import CartDrawer from "./userProductList/cartDrawer";

export default function OrderLayout({ children }) {
  return (
    <>
      <Navbar />

      {children}

      {/* Zustand `cartOpen` se slide in/out — `cartButton` se open */}
      <CartDrawer />
    </>
  );
}