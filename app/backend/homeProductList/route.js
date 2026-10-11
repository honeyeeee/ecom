import connectDb from "../db/db";
import Prod from "../db/productSchema";
import Category from "../db/catergory";
import SubCategory from "../db/subCategory";
import Types from "../db/types";
import searchStore from "@/app/store/search";

export async function GET() {
  const searchBag = searchStore.getState().setsearch;
  try {
    await connectDb();

    const data = await Prod.find()
      .select("name features basePrice.sellingPrice")
      .populate("category", "name")
      .populate("productType", "name")
      .populate("productCategory", "name")
      .lean();
      searchBag(data)


    return Response.json({ success: true, data });
  } catch (error) {
    console.log(error.message);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
