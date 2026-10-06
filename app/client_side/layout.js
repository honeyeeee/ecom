
import Navbar from "./Home_page/navbar";
import CartDrawer from "./userProductList/cartDrawer";
export default function OrderLayout({ children }) {
    return (
      <>
        <Navbar />
  
        {children}
  
        <CartDrawer />
      </>
    );
  }