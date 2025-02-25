
import BrandController from "@controllers/brands.controller";
import express, { Request, Response, Router } from "express";


const router: Router = express.Router();

router.get('/brand', (req: Request, res: Response) => {
    BrandController.getAllBrand(req, res);
});

router.post('/brand/create', (req: Request, res: Response) => {
    BrandController.createBrand(req, res);
});

router.put('/brand/:id/edit', (req: Request, res: Response) => {
    BrandController.editBrand(req, res);
});

router.delete('/brand/:id/delete', (req: Request, res: Response) => {
    BrandController.deleteBrand(req, res);
});

export default router;