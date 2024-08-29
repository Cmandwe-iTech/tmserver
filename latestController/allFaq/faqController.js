import allFaqModel from "../../latestModel/Faq/allFaqModel.js";

export const createFaqData = async (req, res) => {
    try {
        const { question, answer } = req.body;
        if (!question || !answer) {
            return res.status(400).json({ message: 'Question and answer are required' });
        }
        const faq = new allFaqModel({
            question,
            answer
        });
        await faq.save();
        res.status(201).json({ message: 'FAQ data added successfully', faq });
    } catch (error) {
        res.status(500).json({ message: 'Error creating FAQ data', error: error.message });
    }
};

export const getFaqData = async (req, res) => {
    try {
        const faqs = await allFaqModel.find();
        res.status(200).json(faqs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteFaqDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const faq = await allFaqModel.findByIdAndDelete(id);
        if (!faq) return res.status(404).json({ error: 'FAQ not found' });
        res.status(200).json({ message: 'FAQ data deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const editFaqDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const { question, answer } = req.body;
        if (!question || !answer) {
            return res.status(400).json({ message: 'Question and answer are required' });
        }

        const updatedFaq = await allFaqModel.findByIdAndUpdate(
            id,
            { question, answer },
            { new: true }
        );

        if (!updatedFaq) return res.status(404).json({ error: 'FAQ not found' });
        res.status(200).json({ message: 'FAQ data updated successfully', updatedFaq });
    } catch (error) {
        res.status(500).json({ message: 'Error updating FAQ data', error: error.message });
    }
};
