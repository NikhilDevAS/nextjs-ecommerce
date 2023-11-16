import { mongooseConnect } from '@/lib/mongoose';
import { User } from '@/models/User';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await mongooseConnect();
    const { email, password } = req.body;
    User.findOne({ email })
      .then((result) => {
        if (password === result.password) {
          console.log(result);
          res.status(201).json({ userInfo: result, status: true });
        } else {
          res.status(404).json({ status: false, errMsg: 'Invaild Password!' });
        }
      })
      .catch((err) => {
        res
          .status(404)
          .json({ status: false, errMsg: 'Invaild Email Or Password!' });
      });
  }
}
