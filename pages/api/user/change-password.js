import { mongooseConnect } from '@/lib/mongoose';
import { User } from '@/models/User';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    await mongooseConnect();
    const { currentPassword, newPassword, userId } = req.body;

    const userData = await User.findOne({
      _id: userId,
      password: currentPassword,
    }).exec();
    if (userData) {
      User.updateOne({ _id: userData._id }, { password: newPassword }).then(
        (result) => {
          if (result.acknowledged) {
            res.json({ status: true });
          }
        }
      );
    } else {
      res
        .status(401)
        .json({ status: false, massage: 'Invalid Current Password!' });
    }

    res.json(true);
  }
}
