import mongoose from 'mongoose';

const extensiveProgramSchema = new mongoose.Schema({
    Category: { type: String },
    cardData: {
        programstatus: { type: String },
        programName: { type: String },
        programDuration: { type: String },
        modeOfClass: { type: String },
        skillsYouDeveloped: { type: String }, //saperated by commas
        toolsToBeComplete: { type: String }, //saperated by commas
        bgGradientColor: { type: String }, //saperated by commas  
    },
    headerData: {
        headerBgImage: { type: String },
        headerTitle: { type: String },
        headerSubTitle: { type: String }
    },
    highlights: {
        title: { type: String },
        subTitle: { type: String },
        highlightPoints: [{
            icon: { type: String },
            point: { type: String },
        }]
    },
    courseCurriculam: [{
        heading: { type: String },
        topic: [],
        keyTakeways: []
    }],
    skillYouLearn: { type: String }, // Saperated by commas
    topInDemandTools: [{
        logo: { type: String },
        toolsName: { type: String }
    }],
    FeesStuctures:{
       onTimePayment:{
        discount:{type:String},
        originalFees:{type:String},
        duration:{type:String},
       },
       MonthlyPayment:{
        discount:{type:String},
        originalFees:{type:String},
        duration:{type:String},
       },
       scollerShip:{
        discount:{type:String},
        originalFees:{type:String},
        duration:{type:String},
       }
    }
});

const extensiveProgramModel = mongoose.model('extensiveProgramData', extensiveProgramSchema);

export default extensiveProgramModel;