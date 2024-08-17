import mongoose from 'mongoose';

const hireFromToolsCoveredSchema = new mongoose.Schema({
    category: { type: String },
    ToolsCoveredicon: { type: String },
    ToolsCoveredtitle: { type: String }


});

const hireFromToolsCoveredModel = mongoose.model('hireFromToolsCoveredData', hireFromToolsCoveredSchema);

export default hireFromToolsCoveredModel;
