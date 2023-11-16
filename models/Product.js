const { Schema, models, model, default: mongoose } = require('mongoose');

const reviewSchema = new Schema(
  {
    name: { type: String },
    image: { type: String },
    rating: { type: Number },
    comment: { type: String },
  },
  {
    timestamps: true,
  }
);

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
    category: { type: mongoose.Types.ObjectId, ref: 'Category' },
    properties: { type: Object },
    reviews: [{ name: String, image: String, rating: Number, comment: String }],
  },
  {
    timestamps: true,
  }
);

export const Product = models.Product || model('Product', ProductSchema);
