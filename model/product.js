import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

//create schema
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "https://picsum.photos/id/237/200/300" // random image from picsum
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    }
});

//create model
const productModel = mongoose.model('Product', productSchema); // will map to a collection called products, note the singular-Product
module.exports = productModel;
