import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const allowedFormats = ["jpeg", "png"]; // Các định dạng được phép
    const fileFormat = file.mimetype.split("/")[1]; // Lấy đuôi file từ mimetype

    if (!allowedFormats.includes(fileFormat)) {
      throw new Error("Invalid file format. Only JPEG and PNG are allowed.");
    }

    return {
      folder: "melodymartket",
      format: fileFormat, // Định dạng theo file upload
      public_id: file.originalname.split(".")[0], // Giữ nguyên tên file
    };
  },
});

const upload = multer({ storage });

export default upload;
