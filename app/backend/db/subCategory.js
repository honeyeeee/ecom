
import mongoose from "mongoose";
const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  }
});

const SubCategory =
  mongoose.models.SubCategory ||
  mongoose.model("SubCategory", subcategorySchema);

export default SubCategory;