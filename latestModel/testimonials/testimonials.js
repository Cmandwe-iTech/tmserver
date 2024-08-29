import mongoose from 'mongoose';

const testimonialsSchema = new mongoose.Schema({
    category: { type: String },
    studentName: { type: String },
    profilePic: { type: String },
    position: { type: String },
    review: { type: String },
    reviewPoints: { type: String },
    reviewVideo: { type: String }

});

const testimonialsModel = mongoose.model('testimonialsData', testimonialsSchema);

export default testimonialsModel;