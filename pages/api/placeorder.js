import { mongooseConnect } from '@/lib/mongoose';
import { Order } from '@/models/Order';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await mongooseConnect();
    const uuid = uuidv4().split('-')[0];
    const data = await Order.create({
      id: uuid,
      userId: req.body.user_id,
      products: req.body.products,
      paid: false,
      subtotal: req.body.subtotal,
      gst: req.body.gst,
      netamount: req.body.netamount,
      paymentType: req.body.paymentType,
    });
    if (data) {
      res.json({ order_id: data.id });
    }
  }
}
