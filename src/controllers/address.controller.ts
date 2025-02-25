import { Request, Response } from "express";
import { Address } from "@entity/address";
import AddressService from "@services/address.service";

class AddressController {
    static async getAllAddress(req: Request, res: Response) {
        try {
            const address: Address[] = await AddressService.getAllAddress();
            const data = {
                "cod": 200,
                "data": address
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

    static async createAddress(req: Request, res: Response) {
        try {
            const address = await AddressService.createAddress(req.body);
            const data = {
                "cod": 201,
                "message": "Address created",
                "data": address
            }
            res.json(data);
            //res.redirect('/api/users');
        } catch (error) {
            // console.log(error);
            const data = {
                "cod": 500,
                "message": "Internal Server Error",
            }
            res.json(data);
        }
    }

    static async editAddress(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const method = req.method;
            const address = await AddressService.editAddress(Number(id), req.body, method);
            const data = {
                "cod": 200,
                "message": "Address updated",
                "data": address
            }
            res.json(data);
            // res.redirect('/api/users');
        } catch (error) {
            console.log(error);
            const data = {
                "cod": 500,
                "message": "Internal Server Error",
            }
            res.json(data);
        }
    }

    static async deleteAddress(req: Request, res: Response) {
        try {
            const id = req.params.id;
            await AddressService.deleteAddress(Number(id));
            const data = {
                "cod": 200,
                "message": "Address deleted"
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

export default AddressController;