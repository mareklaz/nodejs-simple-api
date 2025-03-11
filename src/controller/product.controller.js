// Maneja las peticiones HTTP y llama a los servicios.
import * as productService from '../services/product.services.js';

export async function createProduct(req, res) {
	try {
		const data = await productService.createProduct(req.body);
		res.status(201).json({ data });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

export async function getProducts(req, res) {
	try {
		const data = await productService.getProducts();

		if (data.length === 0) {
			return res.status(404).json({ message: 'No products found' });
		}

		res.status(200).json({ data });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

export async function getProductById(req, res) {
	try {
		const { id } = req.params;
		const data = await productService.getProductById(id);

		if (!data) {
			return res.status(404).json({ message: 'Product not found' });
		}

		res.status(200).json({ data });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

export async function updateProduct(req, res) {
	try {
		const { id } = req.params;
		const data = await productService.updateProduct(id, req.body);
		res.status(200).json({ data });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

export async function deleteProduct(req, res) {
	try {
		const { id } = req.params;
		const data = await productService.deleteProduct(id);
		res.status(200).json({ data });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}
