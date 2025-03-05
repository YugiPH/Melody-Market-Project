import { User } from "@entity/users";
import UserService from "@services/users.service";
import { Request, Response } from "express";
import cloudinary from "../config/cloudinary";

class UserController {
    static async getAllUsers(req: Request, res: Response) {
        try {
            const users: User[] = await UserService.getAllUsers();
            res.json({ cod: 200, data: users });
        } catch (error) {
            console.error(error);
            res.status(500).json({ cod: 500, message: "Server Error" });
        }
    }

    static async createUser(req: Request, res: Response) {
        try {
            const imageUrl = req.file ? req.file.path : null; // Lấy URL từ Multer
    
            const user = await UserService.createUser({ ...req.body, image: imageUrl });
    
            res.json({ cod: 201, message: "User created", data: user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ cod: 500, message: "Internal Server Error" });
        }
    }
    
    static async editUser(req: Request, res: Response) {
        try {
            const userId = Number(req.params.id);
            const method = req.method;
    
            // 🛠 Nếu có ảnh từ Multer, lấy ảnh mới, nếu không, giữ nguyên ảnh cũ
            const imageUrl = req.file ? req.file.path : req.body.image;
    
            const user = await UserService.editUser(userId, { 
                ...req.body, 
                image: imageUrl // Ảnh có thể null nếu không upload mới
            }, method);
    
            res.json({ cod: 200, message: "User updated", data: user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ cod: 500, message: "Internal Server Error" });
        }
    }
    
    
    static async deleteUser(req: Request, res: Response) {
        try {
            const userId = Number(req.params.id);
            await UserService.deleteUser(userId);
            res.json({ cod: 200, message: "User deleted" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ cod: 500, message: "Internal Server Error" });
        }
    }

    static async getUsersByAddress(req: Request, res: Response) {
        try {
            const addressAddressId = Number(req.params.addressId);
            if (isNaN(addressAddressId)) return res.status(400).json({ cod: 400, message: "Invalid address ID" });
    
            const users = await UserService.getUsersByAddress(addressAddressId);
    
            res.json({ cod: 200, data: users });
        } catch (error) {
            console.error(error);
            res.status(500).json({ cod: 500, message: "Internal Server Error" });
        }
    }
    
}

export default UserController;
