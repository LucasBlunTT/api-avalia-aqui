import { Request, Response } from 'express';
import ProductService from '../services/ProductService';

class ProductController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const products = await ProductService.getAll();
      
      if (!products || products.length === 0) {
        res.status(404).json({ message: 'Nenhum produto encontrado' });
        return;
      }

      res.status(200).json(products);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Erro ao buscar produtos', error: error.message });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, description, experience, recommend } = req.body;

      if (!name || !email || !experience || recommend === undefined) {
        res.status(400).json({ message: 'Campos obrigatórios faltando' });
        return;
      }

      if (!['Feliz', 'Bom', 'Médio', 'Ruim'].includes(experience)) {
        res.status(400).json({ message: 'Experiência inválida' });
        return;
      }

      const newProduct = await ProductService.create({
        name,
        email,
        description,
        experience,
        recommend,
      });

      res.status(201).json(newProduct);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Erro ao criar produto', error: error.message });
    }
  }
}

export default ProductController;
