import mongoose from 'mongoose';

const contactUsormSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phoneNo: { type: String },
    currentlyPursing: { type: String },
    year: { type: String },
    courseChooseWithTM: { type: String }


});

const contactUsormModel = mongoose.model('contactUsFormdata', contactUsormSchema);

export default contactUsormModel;