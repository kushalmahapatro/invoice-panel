import mongoose from 'mongoose';

const collection = 'customer';

const customerSchema = mongoose.Schema({
    name: String,
    number: String,
    address: String,
})

var CustomerMessage = mongoose.model('Customer', customerSchema, collection);

export default CustomerMessage;