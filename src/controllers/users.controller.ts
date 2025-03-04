import { User } from "@entity/users";
import UserService from "@services/users.service";
import { Request, Response } from "express";

class UserController {
    static async getAllUsers(req: Request, res: Response) {
        try {
            const user: User[] = await UserService.getAllUsers();
            const data = {
                "cod": 200,
                "data": user
            }
            res.json(data);
            // res.render('users/list', {
            //     users: users,
            // });
        } catch (error) {
            const data = {
                "cod": 500,
                "message": "Server Not"
            }
            res.json(data);
        }
    }

    static async createUser(req: Request, res: Response) {
        try {
            const user = await UserService.createUser(req.body);
            const data = {
                "cod": 201,
                "message": "User created",
                "data": user
            }
            res.json(data);
            //res.redirect('/api/users');
        } catch (error) {
            const data = {
                "cod": 500,
                "message": "Internal Server Error",
            }
            res.json(data);
        }
    }

    static async editUser(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const method = req.method;
            const user = await UserService.editUser(Number(id), req.body, method);
            const data = {
                "cod": 200,
                "message": "User updated",
                "data": user
            }
            res.json(data);
            // res.redirect('/api/users');
        } catch (error) {
            const data = {
                "cod": 500,
                "message": "Internal Server Error",
            }
            res.json(data);
        }
    }

    static async deleteUser(req: Request, res: Response) {
        try {
            const id = req.params.id;
            await UserService.deleteUser(Number(id));
            const data = {
                "cod": 200,
                "message": "User deleted"
            }
            res.json(data);
            // res.redirect('/api/users');
        } catch (error) {
            const data = {
                "cod": 500,
                "message": "Internal Server Error",
            }
            res.json(data);
        }
    }
}

export default UserController;