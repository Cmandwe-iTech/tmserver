import mongoose from 'mongoose';

const ourPartenerSchema = new mongoose.Schema({
    companyName: { type: String },
    companyLogo: { type: String }
});

const ourPartenerModel = mongoose.model('ourPartenerData', ourPartenerSchema);

export default ourPartenerModel;