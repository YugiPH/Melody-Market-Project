import AddressController from "@controllers/address.controller";
import express, { Request, Response, Router } from "express";


const router: Router = express.Router();

router.get('/address', (req: Request, res: Response) => {
    AddressController.getAllAddress(req, res);
});

router.post('/address/create', (req: Request, res: Response) => {
    AddressController.createAddress(req, res);
});

router.put('/address/:id/edit', (req: Request, res: Response) => {
    AddressController.editAddress(req, res);
});

router.delete('/address/:id/delete', (req: Request, res: Response) => {
    AddressController.deleteAddress(req, res);
});

export default router;