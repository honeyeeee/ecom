import connectDb from "../db/db";
import Prod from "../db/productSchema";
import Category from "../db/catergory";
import SubCategory from "../db/subCategory";
import Types from "../db/types";

const HOMEPAGE_TAGS = ["newArrival", "trending", "bestSeller"];
const LIMIT = 6;

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return Response.json(
        { success: false, message: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const tag = body?.tag;

    if (!tag) {
      return Response.json(
        {
          success: false,
          message:
            "Missing body field: tag (newArrival | trending | bestSeller)",
        },
        { status: 400 }
      );
    }

    if (!HOMEPAGE_TAGS.includes(tag)) {
      return Response.json(
        {
          success: false,
          message: `Invalid tag. Allowed: ${HOMEPAGE_TAGS.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const limit = Number(body?.limit) || 12;

    await connectDb();

    const data = await Prod.find({
      status: "active",
      homepageTags: tag,
    })
      .populate("category", "name")
      .populate("productType", "name")
      .populate("productCategory", "name")
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return Response.json({ success: true, data, count: data.length });
  } catch (error) {
    console.error("productByCategory POST:", error.message);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
