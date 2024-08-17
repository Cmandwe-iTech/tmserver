import ourPartenerModel from '../../latestModel/ourPartner/ourPartener.js';
import cloudinary from '../../middlware/cloudinary.js';
import fs from 'fs';

// Helper function to upload files to Cloudinary
const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.v2.uploader.upload(filePath);
        fs.unlinkSync(filePath);
        return result.secure_url;
    } catch (error) {
        throw new Error(`Error uploading file to Cloudinary: ${error.message}`);
    }
};

export const createOurPartenerData = async (req, res) => {
    try {
        const { companyName } = req.body;

        let companyLogo = '';
        if (req.files && req.files.companyLogo) {
            const companyLogoUrl = await uploadToCloudinary(req.files.companyLogo[0].path);
            companyLogo = companyLogoUrl;
        }

        const ourPartenerPage = new ourPartenerModel({
            companyName,
            companyLogo
        });

        await ourPartenerPage.save();
        res.status(201).json({ message: 'Our Partener data added successfully', ourPartenerPage });
    } catch (error) {
        res.status(500).json({ message: 'Error creating our partener data', error: error.message });
    }
};

// Get all our partener data
export const getOurPartenerData = async (req, res) => {
    try {
        const pages = await ourPartenerModel.find().sort({ createdAt: -1 });
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete our partener data by ID
export const deleteOurPartenerDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const page = await ourPartenerModel.findByIdAndDelete(id);
        if (!page) return res.status(404).json({ error: 'Our Partener data not found' });
        res.status(200).json({ message: 'Our Partener data deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get our partener data by company name
export const getOurPartenerDataByCompanyName = async (req, res) => {
    try {
        const { companyName } = req.query;
        const pages = await ourPartenerModel.find({ companyName }).sort({ createdAt: -1 });
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Edit our partener data by ID

export const editOurPartenerData = async (req, res) => {
    try {
        const { id } = req.params;
        const { companyName } = req.body;

        let companyLogo = '';
        if (req.files && req.files.companyLogo) {
            const companyLogoUrl = await uploadToCloudinary(req.files.companyLogo[0].path);
            companyLogo = companyLogoUrl;
        }

        const updatedData = {
            companyName,
        };

        if (companyLogo) {
            updatedData.companyLogo = companyLogo;
        }

        const updatedPartner = await ourPartenerModel.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedPartner) return res.status(404).json({ error: 'Our Partner data not found' });

        res.status(200).json({ message: 'Our Partner data updated successfully', updatedPartner });
    } catch (error) {
        res.status(500).json({ message: 'Error updating our partner data', error: error.message });
    }
};
