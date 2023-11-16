import { mongooseConnect } from '@/lib/mongoose';
import { Order } from '@/models/Order';
import { Product } from '@/models/Product';
import { User } from '@/models/User';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await mongooseConnect();
      const { id: productId, orderId, rating, comment } = req.body;

      const result = await Order.findOneAndUpdate(
        {
          id: orderId,
          'products._id': productId,
        },
        {
          $set: {
            'products.$.isReviewed': true,
          },
        },
        {
          upsert: true,
        }
      );

      if (result) {
        const user = await User.findOne({ _id: result.userId }).exec();
        if (user) {
          console.log({
            name: user.name,
            image: user.image,
            rating,
            comment,
          });
          const updateProductDoc = await Product.findOneAndUpdate(
            { _id: productId },
            {
              $push: {
                reviews: {
                  name: user.name,
                  image: user.image,
                  rating,
                  comment,
                },
              },
            },
            {
              upsert: true,
            }
          ).exec();

          if (updateProductDoc) {
            res.status(201).json({ status: true });
          }
        }
      }
    } catch (err) {
      res.status(400).json({ status: false });
    }
  }
}
