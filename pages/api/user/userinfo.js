import { User } from '@/models/User';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    if (req.query?.id) {
      const userInfo = await User.findOne({ _id: req.query.id }).exec();
      if (userInfo) {
        res.json({ userInfo: userInfo });
      }
    }
  }

  if (req.method === 'PUT') {
    const {
      id,
      name,
      email,
      phoneNumber,
      address,
      street,
      city,
      zipcode,
      country,
      image,
    } = req.body;

    const response = await User.findByIdAndUpdate(
      { _id: id },
      {
        name,
        email,
        phoneNumber,
        address,
        street,
        city,
        zipcode,
        image,
        country,
      }
    ).exec();

    if (response) {
      res.json({ userInfo: response, status: true });
    }
  }
}
