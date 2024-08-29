import contactUsormModel from "../../latestModel/contactUs/contactForm.js";

export const createContactUsFormData = async (req, res) => {
    try {
        const { name, email, phoneNo, currentlyPursing, year, courseChooseWithTM } = req.body;

        const contactUsFormEntry = new contactUsormModel({
            name,
            email,
            phoneNo,
            currentlyPursing,
            year,
            courseChooseWithTM
        });

        await contactUsFormEntry.save();
        res.status(201).json({ message: 'Contact Us form data added successfully', contactUsFormEntry });
    } catch (error) {
        res.status(500).json({ message: 'Error creating Contact Us form data', error: error.message });
    }
};

export const getContactUsFormData = async (req, res) => {
    try {
        const forms = await contactUsormModel.find().sort({ createdAt: -1 });
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteContactUsFormDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const form = await contactUsormModel.findByIdAndDelete(id);
        if (!form) return res.status(404).json({ error: 'Contact Us form not found' });
        res.status(200).json({ message: 'Contact Us form data deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getContactUsFormDataByName = async (req, res) => {
    try {
        const { name } = req.query;
        const forms = await contactUsormModel.find({ name: new RegExp(name, 'i') }).sort({ createdAt: -1 });
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getContactUsFormDataByEmail = async (req, res) => {
    try {
        const { email } = req.query;
        const forms = await contactUsormModel.find({ email: new RegExp(email, 'i') }).sort({ createdAt: -1 });
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getContactUsFormDataByPhoneNo = async (req, res) => {
    try {
        const { phoneNo } = req.query;
        const forms = await contactUsormModel.find({ phoneNo: new RegExp(phoneNo, 'i') }).sort({ createdAt: -1 });
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getContactUsFormDataByCurrentlyPursing = async (req, res) => {
    try {
        const { currentlyPursing } = req.query;
        const forms = await contactUsormModel.find({ currentlyPursing: new RegExp(currentlyPursing, 'i') }).sort({ createdAt: -1 });
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getContactUsFormDataByYear = async (req, res) => {
    try {
        const { year } = req.query;
        const forms = await contactUsormModel.find({ year: new RegExp(year, 'i') }).sort({ createdAt: -1 });
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getContactUsFormDataByCourseChooseWithTM = async (req, res) => {
    try {
        const { courseChooseWithTM } = req.query;
        const forms = await contactUsormModel.find({ courseChooseWithTM: new RegExp(courseChooseWithTM, 'i') }).sort({ createdAt: -1 });
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
