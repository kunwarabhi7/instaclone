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
const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "insta_clone_profile_pic",
    allowed_formats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 150, height: 150, crop: "fill" }],
  },
});

const postStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "insta_clone_post",

    allowed_formats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 1080, height: 1080, crop: "limit" }],
  },
});

const profileUpload = multer({
  storage: profileStorage,
  limits: { fieldSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image file are allowed"), false);
    }
  },
});

const postUpload = multer({
  storage: postStorage,
  limits: { fieldSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image file are allowed "), false);
    }
  },
});

export { cloudinary, profileUpload, postUpload };
