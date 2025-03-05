import multer from "multer";
import cloudinary from "./cloudinary"; // Import cấu hình Cloudinary
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        return {
            folder: "users",
            format: null,
            public_id: file.originalname,
        };
    },
});

const upload = multer({ storage });

export default upload;
