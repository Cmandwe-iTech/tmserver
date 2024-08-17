import mongoose from 'mongoose';

const instructorSchema = new mongoose.Schema({
    category: { type: String },
    instructorName: { type: String },
    jobRole: { type: String },
    exCompany: { type: String },
    profilePic: { type: String },
});

const instructorModel = mongoose.model('instructorData', instructorSchema);

export default instructorModel;