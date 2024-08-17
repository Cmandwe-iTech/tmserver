import ourAlumniModel from '../../latestModel/ourAlumni/ourAlumniModel.js';
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

export const createOurAlumniData = async (req, res) => {
    try {
        const {
            category,
            studentName,
            jobRole,
            companyName,
            companyCity
        } = req.body;

        let profilePic = '';
        let companyLogo = '';
        if (req.files) {
            if (req.files.profilePic) {
                const profilePicUrl = await uploadToCloudinary(req.files.profilePic[0].path);
                profilePic = profilePicUrl;
            }
            if (req.files.companyLogo) {
                const companyLogoUrl = await uploadToCloudinary(req.files.companyLogo[0].path);
                companyLogo = companyLogoUrl;
            }
        }

        const ourAlumniPage = new ourAlumniModel({
            category,
            studentName,
            jobRole,
            companyName,
            companyCity,
            profilePic,
            companyLogo
        });

        await ourAlumniPage.save();
        res.status(201).json({ message: 'Our Alumni data added successfully', ourAlumniPage });
    } catch (error) {
        res.status(500).json({ message: 'Error creating our alumni data', error: error.message });
    }
};

// Get all our alumni data
export const getOurAlumniData = async (req, res) => {
    try {
        const pages = await ourAlumniModel.find().sort({ createdAt: -1 });
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete our alumni data by ID
export const deleteOurAlumniDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const page = await ourAlumniModel.findByIdAndDelete(id);
        if (!page) return res.status(404).json({ error: 'Our Alumni data not found' });
        res.status(200).json({ message: 'Our Alumni data deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get our alumni data by category
export const getOurAlumniDataByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const pages = await ourAlumniModel.find({ category }).sort({ createdAt: -1 });
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Our Alumni Data by ID
export const updateOurAlumniDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const { category, studentName, jobRole, companyName, companyCity } = req.body;

        const existingData = await ourAlumniModel.findById(id);
        if (!existingData) return res.status(404).json({ error: 'Our Alumni data not found' });

        let profilePic = existingData.profilePic;
        let companyLogo = existingData.companyLogo;

        if (req.files) {
            if (req.files.profilePic) {
                // Delete the old profile picture from Cloudinary if it exists
                if (profilePic) {
                    const publicId = profilePic.split('/').pop().split('.')[0]; // Extract public ID
                    await cloudinary.v2.uploader.destroy(publicId);
                }
                profilePic = await uploadToCloudinary(req.files.profilePic[0].path);
            }
            if (req.files.companyLogo) {
                // Delete the old company logo from Cloudinary if it exists
                if (companyLogo) {
                    const publicId = companyLogo.split('/').pop().split('.')[0]; // Extract public ID
                    await cloudinary.v2.uploader.destroy(publicId);
                }
                companyLogo = await uploadToCloudinary(req.files.companyLogo[0].path);
            }
        }

        const updatedData = {
            category,
            studentName,
            jobRole,
            companyName,
            companyCity,
            profilePic,
            companyLogo
        };

        const updatedAlumni = await ourAlumniModel.findByIdAndUpdate(id, updatedData, { new: true });
        res.status(200).json({ message: 'Our Alumni data updated successfully', updatedAlumni });
    } catch (error) {
        res.status(500).json({ message: 'Error updating our alumni data', error: error.message });
    }
};