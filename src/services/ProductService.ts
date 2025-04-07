import { AppDataSource } from '../database/data-source';
import Product from '../entities/Product';

interface CreateProductDTO {
  name: string;
  email: string;
  description?: string;
  experience: 'Feliz' | 'Bom' | 'Médio' | 'Ruim';
  recommend: boolean;
}

class ProductService {
  async getAll(): Promise<Product[]> {
    const productRepository = AppDataSource.getRepository(Product);
    
    const products = await productRepository.find({
      order: { created_at: 'DESC' },
    });

    return products;
  }

  async create(data: CreateProductDTO): Promise<Product> {
    const productRepository = AppDataSource.getRepository(Product);

    const newProduct = productRepository.create(data);
    await productRepository.save(newProduct);

    return newProduct;
  }
}

export default new ProductService();
