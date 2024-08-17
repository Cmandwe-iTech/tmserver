import mongoose from 'mongoose';

const contactUsSchema = new mongoose.Schema({
    address: { type: String },
    enquiry: {
        email: { type: String },
        contactNo: { type: String }
    },
    forGrievance: {
        email: { type: String },
        contactNo: { type: String }
    },
    ForCorporate: {
        email: { type: String },
        contactNo: { type: String }
    },
    buildingImg: { type: String }
});

const contactUsModel = mongoose.model('contactUspage', contactUsSchema);

export default contactUsModel;