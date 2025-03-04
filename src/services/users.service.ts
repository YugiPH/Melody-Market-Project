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

    static async editUser(user_id: number, data: any, method: string): Promise<User> {
        const { username, email, phone, image, addressAddressId } = data;
        const user = await userRepository.findOne({ where: { user_id } });
    
        if (!user) {
            throw new Error("User not found");
        }
    
        if (method === "PUT") {
            if (!username || !email) {
                throw new Error("Missing required fields for PUT");
            }
            user.username = username || user.username;
            user.email = email || user.email;
            user.phone = phone || user.phone;
            user.image = image || user.image;
    
            if (addressAddressId) {
                const address = await addressRepository.findOne({ where: { address_id: addressAddressId } });
                if (!address) {
                    throw new Error("Address not found");
                }
                user.address = address;
            }
    
            return await userRepository.save(user);
        } else if (method === "PATCH" || method === "POST") {
            user.username = username ?? user.username;
            user.email = email ?? user.email;
            user.phone = phone ?? user.phone;
            user.image = image ?? user.image;
    
            if (addressAddressId) {
                const address = await addressRepository.findOne({ where: { address_id: addressAddressId } });
                if (address) {
                    user.address = address;
                }
            }
    
            return await userRepository.save(user);
        }
    
        return user;
    }
    
    static async getUserById(user_id: number) {
        const user = await userRepository.findOne({ where: { user_id } });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }

    static async deleteUser(user_id: number): Promise<void> {
        const user = await userRepository.findOne({ where: { user_id } });
        if (!user) {
            throw new Error("User not found");
        }
        await userRepository.remove(user);
    }
    
}

export default UserService;