import { User } from '@/models/User';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, password, email } = req.body;
      const data = await User.create({ name, email, password });

      res.status(201).json({ status: true, userInfo: data });
    } catch (error) {
      if (error.name === 'MongoServerError' && error.code === 11000) {
        res.status(400).json({
          status: false,
          message: 'Already have an account. Please Login!',
        });
      }
    }
  }
}
