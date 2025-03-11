// Define las rutas y las conecta con los controladores.

import express from 'express';
import * as productController from '../controller/product.controller.js';

const router = express.Router();

router.get('/products', productController.getProducts);
router.post('/products', productController.createProduct);
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

export default router;
