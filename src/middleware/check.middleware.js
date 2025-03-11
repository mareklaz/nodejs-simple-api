export async function checkProduct(req, res, next) {
	const { name, price, stock } = req.body;
	if (!name || !price || !stock) {
		return res.status(400).json({ message: 'Missing required fields' });
	}
	next();
}
