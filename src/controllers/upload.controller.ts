import { Request, Response } from "express";

const uploadImage = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ message: "No file uploaded" });
            return;
        }

        res.status(200).json({
            imageUrl: (req.file as any).path, // Type assertion để tránh lỗi kiểu dữ liệu
            message: "Upload successful!",
        });
    } catch (error) {
        res.status(500).json({ message: "Upload failed"});
    }
};

export { uploadImage };
