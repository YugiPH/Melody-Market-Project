import { AppDataSource } from "@database/data-source";
import { Brand } from "@entity/brands";

const brandRepository = AppDataSource.getRepository(Brand)

class BrandService{
    static async getAllBrands(): Promise<Brand[]> {
            const data: any = await brandRepository.find()
            return data;
        }
    
        static async createBrand(data: any) {
            const { brand_name, country, description } = data;
            const existingBrand = await brandRepository.findOne({ where: [{ brand_name }] })
            if (existingBrand) {
                throw new Error(`Brand with name ${brand_name} already exists.`);
            }
            const u1: Brand = new Brand();
            u1.brand_name = brand_name;
            u1.country = country;
            u1.description = description;
    
            return await brandRepository.save(u1);
        }
    
        static async editBrand(brand_id: number, data: any, method: string): Promise<Brand> {
            const { brand_name, country, description } = data;
            const brand = await brandRepository.findOne({ where: { brand_id } });
    
            if (!brand) {
                throw new Error("Brand not found");
            }
    
            if (method === "PUT") {
                if (!brand_name) {
                    throw new Error("Missing required fields for PUT");
                }
                brand.brand_name = brand_name || brand.brand_name;
                brand.country = country || brand.country;
                brand.description = description || brand.description;
    
                return await brandRepository.save(brand);
            } else if (method === "PATCH" || method === "POST") {
                brand.brand_name = brand_name ?? brand.brand_name;
                brand.country = country?? brand.country;
                brand.description = description ?? brand.description;
                return await brandRepository.save(brand);
            }
    
            return await brandRepository.save(brand);
        }
    
        static async getBrandById(brand_id: number) {
            const brand = await brandRepository.findOne({ where: { brand_id } });
            if (!brand) {
                throw new Error("Brand not found");
            }
            return brand;
        }
    
        static async deleteBrand(brand_id: number): Promise<void> {
            const brand = await brandRepository.findOne({ where: { brand_id } });
            if (!brand) {
                throw new Error("Brand not found");
            }
            await brandRepository.remove(brand);
        }
}

export default BrandService;