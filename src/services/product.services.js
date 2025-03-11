// Contiene la lógica de acceso a la base de datos.
import Product from '../models/product.model.js';

export async function getProducts(filter = {}, options = {}) {
	// Búsqueda parcial para campos de texto
	const partialFields = ['name', 'sn', 'category'];
	partialFields.forEach((field) => {
		if (filter[field]) {
			filter[field] = { $regex: filter[field], $options: 'i' };
		}
	});

	// Comparación numérica para stock
	if (filter.stock_min || filter.stock_max) {
		filter.stock = {};
		if (filter.stock_min) filter.stock.$gte = Number(filter.stock_min);
		if (filter.stock_max) filter.stock.$lte = Number(filter.stock_max);
		delete filter.stock_min;
		delete filter.stock_max;
	}

	// Comparación numérica para price
	if (filter.price_min || filter.price_max) {
		filter.price = {};
		if (filter.price_min) filter.price.$gte = Number(filter.price_min);
		if (filter.price_max) filter.price.$lte = Number(filter.price_max);
		delete filter.price_min;
		delete filter.price_max;
	}

	return await Product.find(filter)
		.skip(options.skip || 0)
		.limit(options.limit || 0);
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
