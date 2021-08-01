import mongoose from 'mongoose';

const collection = 'invoice';

const invoiceSchema = mongoose.Schema({
    customer: {id : String, name: String, number : String, address: String},
    invoice: String,
    invoiceDate: Date,
    items: [{name : String, price: String, discount: String, quantity: String}],
    subTotal: String,
    advancePayment: String,
    total: String,

})

var InvoiceMessage = mongoose.model('Invoice', invoiceSchema, collection);

export default InvoiceMessage;