import { AppDataSource } from "@database/data-source";
import { Address } from "@entity/address";
import { User } from "@entity/users";

const userRepository = AppDataSource.getRepository(User)
const addressRepository = AppDataSource.getRepository(Address)

class UserService{
    static async getAllUsers(): Promise<User[]> {
        const data: any = await userRepository.find()
        return data;
    }

    static async createUser(data: any) {
        const { username, email, password, phone, role, image, addressAddressId } = data;
    
        const u1: User = new User();
        u1.username = username;
        u1.email = email;
        u1.password = password;
        u1.phone = phone || null;
        u1.image = image || null;
        u1.role = role === 'admin' ? 'admin' : 'user';
    
        if (addressAddressId) {
            const address = await addressRepository.findOne({ where: { address_id: addressAddressId } });
            if (address) {
                u1.address = address;
            } else {
                throw new Error('Address not found');
            }
        }
    
        return await userRepository.save(u1);
    }
    
}