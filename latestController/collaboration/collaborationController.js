import collaborationModel from '../../latestModel/collaboration/collaborationModel.js';

export const createCollaborationData = async (req, res) => {
    try {
        const collaborationPage = new collaborationModel({
            category:req.body.category,
            cName:req.body.cName,
            cCity:req.body.cCity
        });

        await collaborationPage.save();
        res.status(201).json({ message: 'Collaboration data added successfully', collaborationPage });
    } catch (error) {
        res.status(500).json({ message: 'Error creating collaboration data', error: error.message });
    }
};

export const getCollaborationData = async (req, res) => {
    try {
        const pages = await collaborationModel.find().sort({ createdAt: -1 });
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteCollaborationDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const page = await collaborationModel.findByIdAndDelete(id);
        if (!page) return res.status(404).json({ error: 'Collaboration data not found' });
        res.status(200).json({ message: 'Collaboration data deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCollaborationDataByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const pages = await collaborationModel.find({ category }).sort({ createdAt: -1 });
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const editCollaborationDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = {
            category: req.body.category,
            cName: req.body.cName,
            cCity: req.body.cCity
        };
        const page = await collaborationModel.findByIdAndUpdate(id, updatedData, { new: true });
        if (!page) return res.status(404).json({ error: 'Collaboration data not found' });
        res.status(200).json({ message: 'Collaboration data updated successfully', page });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};