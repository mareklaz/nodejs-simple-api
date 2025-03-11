// Contiene la lógica de acceso a la base de datos.
import Product from '../models/product.model.js';

export async function createProduct(data) {
	const product = new Product(data);
	return await product.save();
}

export async function getProducts() {
	return await Product.find();
}

export async function getProductById(id) {
	return await Product.findById(id);
}

export async function updateProduct(id, data) {
	return await Product.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteProduct(id) {
	return await Product.findByIdAndDelete(id);
}
