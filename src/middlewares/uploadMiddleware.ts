import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary"; // Import Cloudinary config

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
      folder: "users",
      resource_type: "auto", // Đảm bảo Cloudinary tự nhận diện loại file
      format: file.mimetype.split("/")[1], // Lấy định dạng từ mimetype
      public_id: file.originalname.split(".")[0], // Giữ nguyên tên file (không đuôi)
  }),
});


const upload = multer({ storage });

export default upload;
