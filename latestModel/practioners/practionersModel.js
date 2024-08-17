import mongoose from 'mongoose';

const practionersSchema = new mongoose.Schema({
    category: { type: String },
    mentorName: { type: String },
    profilePic: { type: String },
    jobRole: { type: String },
    companyName: { type: String },
    companyLogo: { type: String }
});

const practionersModel = mongoose.model('practionersData', practionersSchema);

export default practionersModel;