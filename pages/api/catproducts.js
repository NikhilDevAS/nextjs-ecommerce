import { mongooseConnect } from '@/lib/mongoose';
import { Category } from '@/models/Category';
import { Product } from '@/models/Product';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await mongooseConnect();
    let categoryProduct = [];
    const catgories = await Category.find();
    if (catgories) {
      catgories.map(async (category) => {
        const products = await Product.find({ category: category._id }, null, {
          limit: 4,
        }).exec();
        categoryProduct.push({
          _id: category._id,
          name: category.name,
          products,
        });

        if (catgories.length === categoryProduct.length) {
          res.status(201).json(categoryProduct);
        }
      });
    }

    if (!catgories) {
      res.status(402).json({ status: false });
    }
  }
}
