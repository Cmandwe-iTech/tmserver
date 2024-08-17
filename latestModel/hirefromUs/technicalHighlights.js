import mongoose from 'mongoose';

const hireFromTechnicalHighlightsSchema = new mongoose.Schema({
    category: { type: String },
    technicalHighLighticon: { type: String },
    technicalHighLighttitle: { type: String }


});

const hireFromTechnicalHighlightsModel = mongoose.model('hireFromTechnicalHighlightsData', hireFromTechnicalHighlightsSchema);

export default hireFromTechnicalHighlightsModel;
