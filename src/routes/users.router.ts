import UserController from "@controllers/users.controller";
import express, { Express, NextFunction, Request, Response, Router } from "express";
import { request } from "http";

const router: Router = express.Router();


router.get('/users', (req: Request, res: Response) => {
    UserController.getAllUsers(req, res);
});

router.post('/users/create', (req: Request, res: Response) => {
    UserController.createUser(req, res);
});

router.put('/users/:id/edit', (req: Request, res: Response) => {
    UserController.editUser(req, res);
});
router.patch('/users/:id/edit', (req: Request, res: Response) => {
    UserController.editUser(req, res);
});
router.post('/users/:id/edit', (req: Request, res: Response) => {
    UserController.editUser(req, res);
});

router.delete('/users/:id/delete', (req: Request, res: Response) => {
    UserController.deleteUser(req, res);
});

export default router;