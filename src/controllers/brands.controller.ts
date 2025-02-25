import { Request, Response } from "express";
import { Brand } from "@entity/brands";
import BrandService from "@services/brands.service";

class BrandController {
    static async getAllBrand(req: Request, res: Response) {
        try {
            const brand: Brand[] = await BrandService.getAllBrands();
            const data = {
                "cod": 200,
                "data": brand
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

    static async createBrand(req: Request, res: Response) {
        try {
            const brand = await BrandService.createBrand(req.body);
            const data = {
                "cod": 201,
                "message": "Brand created",
                "data": brand
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

    static async editBrand(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const method = req.method;
            const brand = await BrandService.editBrand(Number(id), req.body, method);
            const data = {
                "cod": 200,
                "message": "Brand updated",
                "data": brand
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

    static async deleteBrand(req: Request, res: Response) {
        try {
            const id = req.params.id;
            await BrandService.deleteBrand(Number(id));
            const data = {
                "cod": 200,
                "message": "Brand deleted"
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

export default BrandController;