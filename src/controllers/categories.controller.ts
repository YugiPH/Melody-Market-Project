import { Request, Response } from "express";
import { Category } from "@entity/categories";
import AddressService from "@services/address.service";
import CatergoriesService from "@services/catergories.service";

class CategoryController {
    static async getAllCategories(req: Request, res: Response) {
        try {
            const category: Category[] = await CatergoriesService.getAllCategories();
            const data = {
                "cod": 200,
                "data": category
            }

            res.json(data);

        } catch (error) {
            const data = {
                "cod": 500,
                "message": "Server Not"
            }
            res.json(data);
        }
    }

    static async createCategory(req: Request, res: Response) {
        try {
            const category = await CatergoriesService.createCategory(req.body);
            const data = {
                "cod": 201,
                "message": "Category created",
                "data": category
            }
            res.json(data);

        } catch (error) {
            // console.log(error);
            const data = {
                "cod": 500,
                "message": "Internal Server Error",
            }
            res.json(data);
        }
    }

    static async editCategory(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const method = req.method;
            const category = await CatergoriesService.editCategory(Number(id), req.body, method);
            const data = {
                "cod": 200,
                "message": "Category updated",
                "data": category
            }
            res.json(data);

        } catch (error) {
            console.log(error);
            const data = {
                "cod": 500,
                "message": "Internal Server Error",
            }
            res.json(data);
        }
    }

    static async deleteCategory(req: Request, res: Response) {
        try {
            const id = req.params.id;
            await CatergoriesService.deleteCategory(Number(id));
            const data = {
                "cod": 200,
                "message": "Category deleted"
            }
            res.json(data);

        } catch (error) {
            const data = {
                "cod": 500,
                "message": "Internal Server Error",
            }
            res.json(data);
        }
    }
}

export default CategoryController;