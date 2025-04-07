import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const productController = new ProductController();
const productRoutes = Router();

productRoutes.get('/', productController.getAll);
productRoutes.post('/', productController.create);

export default productRoutes;
