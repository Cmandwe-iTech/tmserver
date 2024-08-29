import mongoose from 'mongoose';

const broucherSchema = new mongoose.Schema({
    category: { type: String },
    subCategory: { type: String },
    brocher: { type: String }
});

const broucherModel = mongoose.model('brouchers', broucherSchema);

export default broucherModel; 