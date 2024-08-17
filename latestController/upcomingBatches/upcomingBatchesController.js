import upcomingBatchModel from "../../latestModel/upcommingBatches/upcommingBatchModel.js";

export const createUpcomingBatchData = async (req, res) => {
    try {
        const { category, program, date, timing, duration, mode } = req.body;

        const upcomingBatch = new upcomingBatchModel({
            category,
            program,
            date,
            timing,
            duration,
            mode
        });

        await upcomingBatch.save();
        res.status(201).json({ message: 'Upcoming batch data added successfully', upcomingBatch });
    } catch (error) {
        res.status(500).json({ message: 'Error creating upcoming batch data', error: error.message });
    }
};

// Get all upcoming batch data
export const getUpcomingBatchData = async (req, res) => {
    try {
        const batches = await upcomingBatchModel.find().sort({ date: 1, timing: 1 });
        res.status(200).json(batches);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete upcoming batch data by ID
export const deleteUpcomingBatchDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const batch = await upcomingBatchModel.findByIdAndDelete(id);
        if (!batch) return res.status(404).json({ error: 'Upcoming batch not found' });
        res.status(200).json({ message: 'Upcoming batch data deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get upcoming batch data by category
export const getUpcomingBatchDataByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const batches = await upcomingBatchModel.find({ category }).sort({ date: 1, timing: 1 });
        res.status(200).json(batches);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get upcoming batch data by program
export const getUpcomingBatchDataByProgram = async (req, res) => {
    try {
        const { program } = req.params;
        const batches = await upcomingBatchModel.find({ program }).sort({ date: 1, timing: 1 });
        res.status(200).json(batches);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
