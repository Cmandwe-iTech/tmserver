import mongoose from 'mongoose';

const successStorySchema = new mongoose.Schema({
    category: { type: String },
    name: { type: String },
    storyDesc: { type: String },
    points: { type: String }, 
    profilePic: { type: String }
});

const successStoryModel = mongoose.model('successStoryData', successStorySchema);

export default successStoryModel;