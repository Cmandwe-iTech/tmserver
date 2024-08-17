import mongoose from 'mongoose';

const collaborationSchema = new mongoose.Schema({
    category: { type: String },
    cName: { type: String },
    cCity: { type: String },
});

const collaborationModel = mongoose.model('collaborationData', collaborationSchema);

export default collaborationModel;