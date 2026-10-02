import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        Name: {
            type: String,
            required: true,
            trim: true,
        },

        Category: {
            type: String,
            required: true,
            index:true,
            enum: [
                "School Bag",
                "Collage Bag",
                "Travel Bag",
                "Office Bag",
                "Premium Bag",
            ],
        },

        Gender: {
            type: String,
            required: true,
            enum: ["Male", "Female", "Unisex"],
        },

        Description: {
            type: String,
            required: true,
            trim: true,
        },

        Price: {
            type: Number,
            required: true,
            min: 0,
        },

        Image: {
            type: [String],
            required: true,
        },
        Stock:{
            type:Number,
            required:true
        }
    },
    {
        timestamps: true,
    }
);

const Product =
    mongoose.models.Product ||
    mongoose.model("Product", productSchema);

export default Product;