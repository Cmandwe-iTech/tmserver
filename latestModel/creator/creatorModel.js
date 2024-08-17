import mongoose from 'mongoose';
const creatorSchema = new mongoose.Schema({
    category: { type: String },
    instructorName: { type: String },
    jobRole: { type: String },
    exCompany: { type: String },
    profilePic: { type: String },
});
const creatorModel = mongoose.model('creatorData', creatorSchema);
export default creatorModel