import { AppDataSource } from "@database/data-source";
import { Category } from "@entity/categories";

const categoryRepository = AppDataSource.getRepository(Category)

class CatergoriesService {
    static async getAllCategories(): Promise<Category[]> {
        const data: any = await categoryRepository.find()
        return data;
    }

    static async createCategory(data: any) {
        const { category_name, description } = data;
        const existingCategory = await categoryRepository.findOne({ where: [{ category_name }] })
        if (existingCategory) {
            throw new Error(`Address with name ${category_name} already exists.`);
        }
        const u1: Category = new Category();
        u1.category_name = category_name;
        u1.description = description;

        return await categoryRepository.save(u1);
    }

    static async editCategory(category_id: number, data: any, method: string): Promise<Category> {
        const { category_name, description } = data;
        const category = await categoryRepository.findOne({ where: { category_id } });

        if (!category) {
            throw new Error("Address not found");
        }

        if (method === "PUT") {
            if (!category_name) {
                throw new Error("Missing required fields for PUT");
            }
            category.category_name = category_name || category.category_name;
            category.description = description || category.description;

            return await categoryRepository.save(category);
        } else if (method === "PATCH" || method === "POST") {
            category.category_name = category_name ?? category.category_name;
            category.description = description ?? category.description;
            return await categoryRepository.save(category);
        }

        return await categoryRepository.save(category);
    }

    static async getCategoryById(category_id: number) {
        const category = await categoryRepository.findOne({ where: { category_id } });
        if (!category) {
            throw new Error("Category not found");
        }
        return category;
    }

    static async deleteCategory(category_id: number): Promise<void> {
        const category = await categoryRepository.findOne({ where: { category_id } });
        if (!category) {
            throw new Error("Category not found");
        }
        await categoryRepository.remove(category);
    }
}

export default CatergoriesService;