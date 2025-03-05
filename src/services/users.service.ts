import { AppDataSource } from "@database/data-source";
import { Address } from "@entity/address";
import { User } from "@entity/users";
import cloudinary from "../config/cloudinary";

const userRepository = AppDataSource.getRepository(User);
const addressRepository = AppDataSource.getRepository(Address);

class UserService {
    static async getAllUsers(): Promise<User[]> {
        return await userRepository.find();
    }

    static async createUser(data: any) {
        const { username, email, password, phone, role, image, addressAddressId } = data;

        const u1: User = new User();
        u1.username = username;
        u1.email = email;
        u1.password = password;
        u1.phone = phone || null;
        u1.role = role === 'admin' ? 'admin' : 'user';

        // Ảnh được upload trực tiếp từ Multer, không cần upload lại
        if (image) {
            u1.image = image;
        }

        if (addressAddressId) {
            const address = await addressRepository.findOne({ where: { address_id: addressAddressId } });
            if (!address) throw new Error('Address not found');
            u1.address = address;
        }

        return await userRepository.save(u1);
    }


    static async editUser(user_id: number, data: any, method: string): Promise<User> {
        const { username, email, phone, image, addressAddressId } = data;
        const user = await userRepository.findOne({ where: { user_id } });
        if (!user) throw new Error("User not found");

        // 🛠 Chỉ update các trường nếu có dữ liệu mới
        if (username !== undefined) user.username = username;
        if (email !== undefined) user.email = email;
        if (phone !== undefined) user.phone = phone;

        // 🛠 Chỉ thay ảnh nếu có ảnh mới
        if (image && image !== user.image) {
            if (user.image) {
                const oldImagePublicId = user.image.match(/\/v\d+\/(.+)\.\w+$/)?.[1];
                if (oldImagePublicId) await cloudinary.uploader.destroy(oldImagePublicId);
            }
            user.image = image; // Dùng ảnh đã upload từ Multer
        }

        // 🛠 Chỉ thay địa chỉ nếu có ID mới
        if (addressAddressId !== undefined) {
            const address = await addressRepository.findOne({ where: { address_id: addressAddressId } });
            if (!address) throw new Error("Address not found");
            user.address = address;
        }

        return await userRepository.save(user);
    }


    static async getUserById(user_id: number) {
        const user = await userRepository.findOne({ where: { user_id } });
        if (!user) throw new Error("User not found");
        return user;
    }

    static async deleteUser(user_id: number): Promise<void> {
        const user = await userRepository.findOne({ where: { user_id } });
        if (!user) throw new Error("User not found");

        // Xóa ảnh trên Cloudinary nếu có
        if (user.image) {
            const imagePublicId = user.image.split("/").pop()?.split(".")[0];
            await cloudinary.uploader.destroy(`users/${imagePublicId}`);
        }

        await userRepository.remove(user);
    }

    static async getUsersByAddress(addressAddressId: number): Promise<User[]> {
        return await userRepository.find({
            where: { address: { address_id: addressAddressId } },
            relations: ["address"],
        });
    }

}

export default UserService;
