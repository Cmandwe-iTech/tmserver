import mongoose from 'mongoose';

const faqByCategorySchema = new mongoose.Schema({
    category: { type: String },
    question: { type: String },
    answer: { type: String }
});

const faqByCategoryModel = mongoose.model('faqByCategoryData', faqByCategorySchema);

export default faqByCategoryModel;