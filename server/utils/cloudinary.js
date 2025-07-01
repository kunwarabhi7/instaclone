import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
// Configration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "insta_clone_profile_pic",
    allowed_formats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 150, height: 150, crop: "fill" }],
  },
});
const upload = multer({ storage });

export { cloudinary, upload };
