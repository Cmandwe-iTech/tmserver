import mongoose from 'mongoose';

const allFaqSchema = new mongoose.Schema({
    question: { type: String },
    answer: { type: String }
});

const allFaqModel = mongoose.model('allFaqData', allFaqSchema);

export default allFaqModel;