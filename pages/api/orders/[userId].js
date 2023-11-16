import { mongooseConnect } from '@/lib/mongoose';
import { Order } from '@/models/Order';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { userId } = req.query;

    await mongooseConnect();

    const orders = await Order.find({ userId }, null, {
      sort: { _id: -1 },
    }).exec();

    res.status(201).json({ orders });
  }
}
