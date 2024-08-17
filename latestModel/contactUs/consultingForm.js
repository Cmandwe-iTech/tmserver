import mongoose from 'mongoose';

const consultingFormSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phoneNo: { type: String }
});

const consultingFormModel = mongoose.model('consultingFormForm', consultingFormSchema);

export default consultingFormModel;