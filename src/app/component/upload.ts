import type { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from 'cloudinary';
import { IncomingForm } from 'formidable';

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data: any = await new Promise((resolve, reject) => {
    // handle file parsing
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
  
  const file = data?.files?.inputFile[0].filepath;

// upload the video file
  const response = await cloudinary.v2.uploader.upload(file, {
    resource_type: 'video',
    public_id: 'my_video',
  });
  return res.json(response);
};