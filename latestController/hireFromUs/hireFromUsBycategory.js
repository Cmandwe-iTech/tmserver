
import hireFromModel from '../../latestModel/hirefromUs/hirefromModel.js';

export const createHireFrom = async (req, res) => {
    try {
        const {
            category,
            ProfessionalSpokenEnglishTrainingSession,
            AptitudeTestAndLogicalReasoningCriticalThinking,
            MindsetBatchForGrowthInCareer,
            inventoryAvailable
        } = req.body;

        let parsedInventoryAvailable = [];
        if (inventoryAvailable) {
            parsedInventoryAvailable = typeof inventoryAvailable === 'string'
                ? JSON.parse(inventoryAvailable)
                : inventoryAvailable;
        }

        const newHireFrom = new hireFromModel({
            category,
            ProfessionalSpokenEnglishTrainingSession,
            AptitudeTestAndLogicalReasoningCriticalThinking,
            MindsetBatchForGrowthInCareer,
            inventoryAvailable: parsedInventoryAvailable
        });

        await newHireFrom.save();
        res.status(201).json({ message: 'Hire From created successfully', newHireFrom });

    } catch (error) {
        console.error('Error creating Hire From:', error);
        res.status(500).json({ message: 'Error creating Hire From', error: error.message });
    }
};

export const getHireFrom = async (req, res) => {
    try {
        const hireFromData = await hireFromModel.find();
        res.status(200).json(hireFromData);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving Hire From data', error: error.message });
    }
};

export const getHireFromById = async (req, res) => {
    try {
        const { id } = req.params;
        const hireFrom = await hireFromModel.findById(id);
        if (!hireFrom) return res.status(404).json({ message: 'Hire From not found' });
        res.status(200).json(hireFrom);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving Hire From data', error: error.message });
    }
};

export const getHireFromByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const hireFrom = await hireFromModel.find({ category: category });
        if (!hireFrom) return res.status(404).json({ message: 'Hire From not found' });
        res.status(200).json(hireFrom);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving Hire From data', error: error.message });
    }
};
export const updateHireFrom = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            category,
            ProfessionalSpokenEnglishTrainingSession,
            AptitudeTestAndLogicalReasoningCriticalThinking,
            MindsetBatchForGrowthInCareer,
            inventoryAvailable
        } = req.body;

        let parsedInventoryAvailable = [];
        if (inventoryAvailable) {
            parsedInventoryAvailable = typeof inventoryAvailable === 'string'
                ? JSON.parse(inventoryAvailable)
                : inventoryAvailable;
        }

        const hireFrom = await hireFromModel.findById(id);
        if (!hireFrom) return res.status(404).json({ message: 'Hire From not found' });

        // Update fields if they are provided in the request
        hireFrom.category = category ?? hireFrom.category;
        hireFrom.ProfessionalSpokenEnglishTrainingSession = ProfessionalSpokenEnglishTrainingSession ?? hireFrom.ProfessionalSpokenEnglishTrainingSession;
        hireFrom.AptitudeTestAndLogicalReasoningCriticalThinking = AptitudeTestAndLogicalReasoningCriticalThinking ?? hireFrom.AptitudeTestAndLogicalReasoningCriticalThinking;
        hireFrom.MindsetBatchForGrowthInCareer = MindsetBatchForGrowthInCareer ?? hireFrom.MindsetBatchForGrowthInCareer;
        hireFrom.inventoryAvailable = parsedInventoryAvailable

        // Handle updates for inventoryAvailable

        await hireFrom.save();
        res.status(200).json({ message: 'Hire From updated successfully', hireFrom });

    } catch (error) {
        console.error('Error updating Hire From:', error);
        res.status(500).json({ message: 'Error updating Hire From', error: error.message });
    }
};



// Delete a hireFrom entry by ID
export const deleteHireFrom = async (req, res) => {
    try {
        const { id } = req.params;
        const hireFrom = await hireFromModel.findById(id);
        if (!hireFrom) return res.status(404).json({ message: 'Hire From not found' });

        await hireFromModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Hire From deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Hire From', error: error.message });
    }
};
