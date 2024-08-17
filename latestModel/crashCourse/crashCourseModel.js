import mongoose from 'mongoose';

const crashCourseSchema = new mongoose.Schema({
    category: { type: String },
    crashCourseCard: {
        programstatus: { type: String },
        programName: { type: String },
        programDuration: { type: String },
        skillsYouDeveloped: { type: String }, //saperated by commas
        bgGradientColor: { type: String }, //saperated by commas  
    }

});

const crashCourseModel = mongoose.model('crashCourseData', crashCourseSchema);

export default crashCourseModel;