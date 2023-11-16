import { mongooseConnect } from '@/lib/mongoose';
import { Category } from '@/models/Category';
import { Product } from '@/models/Product';

export default async function handler(req, res) {
  await mongooseConnect();

  await Category.find();

  res.json(await Product.find({ _id: req.body.ids }).populate('category'));
}
