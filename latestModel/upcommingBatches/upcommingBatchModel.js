import mongoose from 'mongoose';

const upcomingBatchSchema = new mongoose.Schema({
    category:{type:String},
    program: { type: String },
    date: { type: String },
    timing: { type: String },
    duration: { type: String },
    mode: { type: String }
});

const upcomingBatchModel = mongoose.model('upcomingBatchData', upcomingBatchSchema);

export default upcomingBatchModel;