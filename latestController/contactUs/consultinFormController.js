import consultingFormModel from "../../latestModel/contactUs/consultingForm.js";

export const createConsultingFormData = async (req, res) => {
    try {
        const { name, email, phoneNo } = req.body;

        const consultingFormEntry = new consultingFormModel({
            name,
            email,
            phoneNo
        });

        await consultingFormEntry.save();
        res.status(201).json({ message: 'Consulting form data added successfully', consultingFormEntry });
    } catch (error) {
        res.status(500).json({ message: 'Error creating consulting form data', error: error.message });
    }
};

export const getConsultingFormData = async (req, res) => {
    try {
        const forms = await consultingFormModel.find().sort({ createdAt: -1 });
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteConsultingFormDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const form = await consultingFormModel.findByIdAndDelete(id);
        if (!form) return res.status(404).json({ error: 'Consulting form not found' });
        res.status(200).json({ message: 'Consulting form data deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

