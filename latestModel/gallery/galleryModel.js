import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
    category: { type: String },
    eventName: { type: String },
    eventImage: { type: String }

});

const galleryModel = mongoose.model('galleryData', gallerySchema);

export default galleryModel;