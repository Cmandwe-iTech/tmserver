import practionersModel from '../../latestModel/practioners/practionersModel.js';
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

export const createPractionersData = async (req, res) => {
    try {
        const { category, mentorName, jobRole, companyName } = req.body;

        let profilePic = '';
        let companyLogo = '';

        if (req.files) {
            if (req.files.profilePic && req.files.profilePic[0]) {
                const profilePicUrl = await uploadToCloudinary(req.files.profilePic[0].path);
                profilePic = profilePicUrl;
            }
            if (req.files.companyLogo && req.files.companyLogo[0]) {
                const companyLogoUrl = await uploadToCloudinary(req.files.companyLogo[0].path);
                companyLogo = companyLogoUrl;
            }
        }

        const practionersPage = new practionersModel({
            category,
            mentorName,
            profilePic,
            jobRole,
            companyName,
            companyLogo
        });

        await practionersPage.save();
        res.status(201).json({ message: 'Practioners data added successfully', practionersPage });
    } catch (error) {
        res.status(500).json({ message: 'Error creating practioners data', error: error.message });
    }
};


// Get all practioners data
export const getPractionersData = async (req, res) => {
    try {
        const pages = await practionersModel.find().sort({ createdAt: -1 });
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete practioners data by ID
export const deletePractionersDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const page = await practionersModel.findByIdAndDelete(id);
        if (!page) return res.status(404).json({ error: 'Practioners data not found' });
        res.status(200).json({ message: 'Practioners data deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get practioners data by category
export const getPractionersDataByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const pages = await practionersModel.find({ category }).sort({ createdAt: -1 });
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const editPractionersData = async (req, res) => {
    try {
        const { id } = req.params;
        const { category, mentorName, jobRole, companyName } = req.body;

        // Prepare data for updating
        const updatedData = {
            category,
            mentorName,
            jobRole,
            companyName
        };

        // Handle file uploads if present
        if (req.files) {
            if (req.files.profilePic) {
                const profilePicUrl = await uploadToCloudinary(req.files.profilePic[0].path);
                updatedData.profilePic = profilePicUrl;
            }
            if (req.files.companyLogo) {
                const companyLogoUrl = await uploadToCloudinary(req.files.companyLogo[0].path);
                updatedData.companyLogo = companyLogoUrl;
            }
        }

        // Update the practitioner data
        const updatedPractitioner = await practionersModel.findByIdAndUpdate(
            id,
            updatedData,
            { new: true } // Return the updated document
        );

        if (!updatedPractitioner) {
            return res.status(404).json({ message: 'Practitioner not found' });
        }

        res.status(200).json({ message: 'Practitioner updated successfully', updatedPractitioner });
    } catch (error) {
        res.status(500).json({ message: 'Error updating practitioner data', error: error.message });
    }
};
