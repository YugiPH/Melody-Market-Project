import { AppDataSource } from "@database/data-source";
import { Address } from "@entity/address";

const addressRepository = AppDataSource.getRepository(Address)

class AddressService {
    static async getAllAddress(): Promise<Address[]> {
        const data: any = await addressRepository.find()
        return data;
    }

    static async createAddress(data: any) {
        const { province_name } = data;
        const existingAddress = await addressRepository.findOne({ where: [{ province_name }] })
        if (existingAddress) {
            throw new Error(`Address with name ${province_name} already exists.`);
        }
        const u1: Address = new Address();
        u1.province_name = province_name;

        return await addressRepository.save(u1);
    }

    static async editAddress(address_id: number, data: any, method: string): Promise<Address> {
        const { province_name } = data;
        const address = await addressRepository.findOne({ where: { address_id } });

        if (!address) {
            throw new Error("Address not found");
        }

        if (method === "PUT") {
            if (!province_name) {
                throw new Error("Missing required fields for PUT");
            }
            address.province_name = province_name || address.province_name;

            return await addressRepository.save(address);
        } else if (method === "PATCH" || method === "POST") {
            address.province_name = province_name ?? address.province_name;
            return await addressRepository.save(address);
        }

        return await addressRepository.save(address);
    }

    static async getAddressById(address_id: number) {
        const address = await addressRepository.findOne({ where: { address_id } });
        if (!address) {
            throw new Error("Address not found");
        }
        return address;
    }

    static async deleteAddress(address_id: number): Promise<void> {
        const address = await addressRepository.findOne({ where: { address_id } });
        if (!address) {
            throw new Error("Address not found");
        }
        await addressRepository.remove(address);
    }
}

export default AddressService;