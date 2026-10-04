import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    // SEO-friendly URL: "oversized-black-tshirt"
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    // Bullet points jo UI par dikhte hain: ["100% Cotton", "Bio-wash"]
    features: [String],

    // Base Pricing (Agar sabhi sizes ka price same ho)
    basePrice: {
      mrp: { type: Number, required: true, min: 0 },
      sellingPrice: { type: Number, required: true, min: 0 },
    },

    // Category References
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },
    productType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    productCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Types",
      required: true,
    },
    occasion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Occasion",
    },

    // Status: Admin draft rakh sake
    status: {
      type: String,
      enum: ["draft", "active", "archived"],
      default: "draft",
      index: true,
    },

    homepageTags: {
      type: [String],
      enum: ["newArrival", "trending", "bestSeller"],
      default: [],
    },

    // Color & Size Matrix
    variants: [
      {
        color: {
          name: { type: String, required: true }, // "Jet Black"
          hexCode: { type: String }, // "#000000" (UI me color dot dikhane ke liye)
        },
        images: [
          {
            id: { type: String, required: true },
            url: { type: String, required: true },
            isThumbnail: { type: Boolean, default: false }, // Card par kaunsi photo dikhegi
          },
        ],
        sizes: [
          {
            size: {
              type: String,
              enum: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"],
              required: true,
            },
            stock: {
              type: Number,
              min: 0,
              default: 0,
            },
            sku: {
              type: String,
              trim: true,
            },
            // Optional: Agar 2XL/3XL par extra charge lena ho
            additionalPrice: {
              type: Number,
              default: 0,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Search optimize karne ke liye Text Index
productSchema.index({ name: "text", description: "text" });

const Prod = mongoose.models.Prod || mongoose.model("Prod", productSchema);
export default Prod;