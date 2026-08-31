"use server";
import Product from "@/app/backend/db/productSchema";
import connectDb from "@/app/backend/db/db";


export async function deleteProduct(id) {
    try {
        await connectDb();

    console.log("Delete karna hai:", id);

    const response = await Product.findByIdAndDelete(id);

        console.log("SERVER:", id);

          return {
      success: true,
      product: response,
    };
    } catch (error) {
        console.log(error);

    return {
      success: false,
      error: "Product delete nahi hua",
    };
    }
}