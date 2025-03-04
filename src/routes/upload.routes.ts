import express from "express";
import { uploadImage } from "../controllers/upload.controller";
import upload from "../middlewares/uploadMiddleware";

const router = express.Router();

router.post("/upload", upload.single("image"), uploadImage);

export default router;
