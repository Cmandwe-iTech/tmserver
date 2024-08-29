import mongoose from 'mongoose';
const studentReviewSchema = new mongoose.Schema({
    category: { type: String },
    studentName: { type: String },
    profilePic: { type: String },
    jobRole: { type: String },
    companyName: { type: String },
    review: { type: String },
    importantPoints: { type: String },
});
const studentReviewModel = mongoose.model('studentReviewData', studentReviewSchema);
export default studentReviewModel;