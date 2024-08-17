import mongoose from 'mongoose';

const queryDataSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    phoneNo: { type: String },
    currentlyPursing: { type: String },
    WorkExperienceInYear: { type: String }
});

const queryDataModel = mongoose.model('queryData', queryDataSchema);

export default queryDataModel;