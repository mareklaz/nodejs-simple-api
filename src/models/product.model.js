import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
	{
		sn: {
			type: String,
			required: [true, 'Serial number is required'],
			unique: true,
		},
		name: {
			type: String,
			required: [true, 'Product name is required'],
		},
		price: {
			type: Number,
			required: [true, 'Product price is required'],
		},
		description: {
			type: String,
			required: false,
		},
		category: {
			type: String,
			required: false,
		},
		stock: {
			type: Number,
			required: [true, 'Product stock is required'],
			default: 0,
		},
		active: {
			type: Boolean,
			required: false,
			default: true,
		},
	},
	{
		virtuals: true,
		timestamps: true,
		toJSON: {
			virtuals: true,
			transform: (doc, ret) => {
				delete ret._id;
				delete ret.__v;
				return ret;
			},
		},
	}
);

const Product = mongoose.model('Product', ProductSchema);

export default Product;
