import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
    category: { type: String },
    certificateImage: { type: String },
    rankDetails: [{
        rank: { type: String },
        programName: { type: String },
        rankGivenBy: { type: String }
    }]
});

const certificateModel = mongoose.model('certificateData', certificateSchema);

export default certificateModel; 