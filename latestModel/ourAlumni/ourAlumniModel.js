import mongoose from 'mongoose';

const ourAlumniSchema = new mongoose.Schema({
    category: { type: String },
    studentName: { type: String },
    profilePic: { type: String },
    jobRole: { type: String },
    companyName: { type: String },
    companyCity: { type: String },
    companyLogo: { type: String }
});

const ourAlumniModel = mongoose.model('ourAlumniData', ourAlumniSchema);

export default ourAlumniModel;