import mongoose from 'mongoose';

const hireFromSchema = new mongoose.Schema({
    category: { type: String },

    ProfessionalSpokenEnglishTrainingSession: { type: String },
    AptitudeTestAndLogicalReasoningCriticalThinking: { type: String },
    MindsetBatchForGrowthInCareer: { type: String },
    inventoryAvailable: [{
        number: { type: String },
        title: { type: String }
    }]
});

const hireFromModel = mongoose.model('hireFromData', hireFromSchema);

export default hireFromModel;
