import queryDataModel from '../../latestModel/queryData/queryModel.js';

// Create a new query data entry
export const createQueryData = async (req, res) => {
    try {
        const newQueryData = new queryDataModel(req.body);
        await newQueryData.save();
        res.status(201).json({ message: 'Query data created successfully', data: newQueryData });
    } catch (error) {
        res.status(500).json({ message: 'Error creating query data', error });
    }
};

// Get all query data entries
export const getAllQueryData = async (req, res) => {
    try {
        const queryData = await queryDataModel.find();
        res.status(200).json(queryData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching query data', error });
    }
};


// Delete a query data entry by ID
export const deleteQueryData = async (req, res) => {
    try {
        const deletedQueryData = await queryDataModel.findByIdAndDelete(req.params.id);
        if (!deletedQueryData) {
            return res.status(404).json({ message: 'Query data not found' });
        }
        res.status(200).json({ message: 'Query data deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting query data', error });
    }
};
