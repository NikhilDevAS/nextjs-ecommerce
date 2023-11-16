import multiparty from 'multiparty';
import cloudinary from '@/lib/cloudinary';

export default async function handler(req, res) {
  const form = new multiparty.Form();

  form.parse(req, (err, fields, files) => {
    if (err) throw err;
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };
    cloudinary.v2.uploader
      .upload(files.file[0].path, options)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => console.log(err));
  });
}

export const config = {
  api: { bodyParser: false },
};
