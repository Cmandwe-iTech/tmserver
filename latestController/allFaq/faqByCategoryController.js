import faqByCategoryModel from '../../latestModel/Faq/faqByCategoryModel.js';

export const createFaqByCategoryData = async (req, res) => {
    try {
        const { category, question, answer } = req.body;

        const faq = new faqByCategoryModel({
            category,
            question,
            answer
        });
        await faq.save();
        res.status(201).json({ message: 'FAQ by category data added successfully', faq });
    } catch (error) {
        res.status(500).json({ message: 'Error creating FAQ by category data', error: error.message });
    }
};

export const getFaqByCategoryData = async (req, res) => {
    try {
        const faqs = await faqByCategoryModel.find().sort({ category: 1, question: 1 });
        res.status(200).json(faqs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteFaqByCategoryDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const faq = await faqByCategoryModel.findByIdAndDelete(id);
        if (!faq) return res.status(404).json({ error: 'FAQ by category not found' });
        res.status(200).json({ message: 'FAQ by category data deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getFaqByCategoryDataByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const faqs = await faqByCategoryModel.find({ category }).sort({ question: 1 });
        res.status(200).json(faqs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const editFaqByCategoryDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const { category, question, answer } = req.body;

        const updatedFaq = await faqByCategoryModel.findByIdAndUpdate(
            id,
            { category, question, answer },
            { new: true }
        );

        if (!updatedFaq) return res.status(404).json({ error: 'FAQ not found' });

        res.status(200).json({ message: 'FAQ by category data updated successfully', updatedFaq });
    } catch (error) {
        res.status(500).json({ message: 'Error updating FAQ by category data', error: error.message });
    }
};