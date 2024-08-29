import mongoose from 'mongoose';

const masterClassSchema = new mongoose.Schema({
    category: { type: String },
    masterClassRegisterLink: { type: String },
    cardData: {
        masterClassTitle: { type: String },
        masterClassSubTitle: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        time: { type: String },
        venue: { type: String },
        whatYouWillGain: [],
        mentorData: {
            mentorName: { type: String },
            jobRole: { type: String },
            company: { type: String },
            companyLog: { type: String },
            yearOfExperience: { type: String },
            experiencePoint: { type: String },
            mentorProfile: { type: String }
        },
        masterClassFor: {
            title: { type: String },
            Icon: { type: String }
        }
    }
});

const masterClassModel = mongoose.model('masterClassData', masterClassSchema);

export default masterClassModel;