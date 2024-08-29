import creatorModel from '../../latestModel/creator/creatorModel.js';
import cloudinary from '../../middlware/cloudinary.js';
import fs from 'fs';

const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.v2.uploader.upload(filePath);
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error deleting file: ${filePath}`, err);
            } else {
                console.log(`Successfully deleted file: ${filePath}`);
            }
        });
        return result.secure_url;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw error;
    }
};

export const createCreatorData = async (req, res) => {
    try {
        const {
            category,
            instructorName,
            jobRole,
            exCompany
        } = req.body;

        let profilePic = '';
        if (req.files && req.files.profilePic) {
            const profilePicUrl = await uploadToCloudinary(req.files.profilePic[0].path);
            profilePic = profilePicUrl;
        }

        const creatorPage = new creatorModel({
            category,
            instructorName,
            jobRole,
            exCompany,
            profilePic
        });

        await creatorPage.save();
        res.status(201).json({ message: 'Creator data added successfully', creatorPage });
    } catch (error) {
        res.status(500).json({ message: 'Error creating creator data', error: error.message });
    }
};

export const getCreatorData = async (req, res) => {
    try {
        const pages = await creatorModel.find().sort({ createdAt: -1 });
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteCreatorDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const page = await creatorModel.findByIdAndDelete(id);
        if (!page) return res.status(404).json({ error: 'Creator data not found' });
        res.status(200).json({ message: 'Creator data deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCreatorDataByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const pages = await creatorModel.find({ category }).sort({ createdAt: -1 });
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const editCreatorData = async (req, res) => {
    try {
        const { id } = req.params;
        const { category, instructorName, jobRole, exCompany } = req.body;

        const creatorPage = await creatorModel.findById(id);
        if (!creatorPage) return res.status(404).json({ error: 'Creator data not found' });

        creatorPage.category = category || creatorPage.category;
        creatorPage.instructorName = instructorName || creatorPage.instructorName;
        creatorPage.jobRole = jobRole || creatorPage.jobRole;
        creatorPage.exCompany = exCompany || creatorPage.exCompany;

        if (req.files && req.files.profilePic) {
            const profilePicUrl = await uploadToCloudinary(req.files.profilePic[0].path);
            creatorPage.profilePic = profilePicUrl;
        }

        await creatorPage.save();
        res.status(200).json({ message: 'Creator data updated successfully', creatorPage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
