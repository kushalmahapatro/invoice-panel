import mongoose from 'mongoose';

const collection = 'access';

const accessSchema = mongoose.Schema({
    email: String,
    password: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var AccessMessage = mongoose.model('Access', accessSchema, collection);

export default AccessMessage;