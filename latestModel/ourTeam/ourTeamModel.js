import mongoose from 'mongoose';

const ourTeamSchema = new mongoose.Schema({
    memberName: { type: String },
    profilePic: { type: String },
    position: { type: String },
});

const ourTeamModel = mongoose.model('ourTeamData', ourTeamSchema);

export default ourTeamModel;