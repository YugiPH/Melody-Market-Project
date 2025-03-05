import express, { Request, Response, Router } from "express";
import UserController from "@controllers/users.controller";
import upload from "../config/upload";

const router: Router = express.Router();

router.get('/users', (req: Request, res: Response) => {
    UserController.getAllUsers(req, res);
});

router.post('/users/create', upload.single("image"), (req: Request, res: Response) => {
    UserController.createUser(req, res);
});

router.put('/users/:id/edit', upload.single("image"), (req: Request, res: Response) => {
    UserController.editUser(req, res);
});

router.patch('/users/:id/edit', upload.single("image"), (req: Request, res: Response) => {
    UserController.editUser(req, res);
});

router.delete('/users/:id/delete', (req: Request, res: Response) => {
    UserController.deleteUser(req, res);
});

router.get('/users/address/:addressId', (req: Request, res: Response) => {
    UserController.getUsersByAddress(req, res);
})

export default router;
