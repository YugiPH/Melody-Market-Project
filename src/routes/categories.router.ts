import CategoryController from "@controllers/categories.controller";
import express, { Request, Response, Router } from "express";


const router: Router = express.Router();

router.get('/category', (req: Request, res: Response) => {
    CategoryController.getAllCategories(req, res);
});

router.post('/category/create', (req: Request, res: Response) => {
    CategoryController.createCategory(req, res);
});

router.put('/category/:id/edit', (req: Request, res: Response) => {
    CategoryController.editCategory(req, res);
});

router.delete('/category/:id/delete', (req: Request, res: Response) => {
    CategoryController.deleteCategory(req, res);
});

export default router;