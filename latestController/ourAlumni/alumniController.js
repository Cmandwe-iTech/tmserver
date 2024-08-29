import ourAlumniModel from '../../latestModel/ourAlumni/ourAlumniModel.js';
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

export const getOurAlumniData = async (req, res) => {
    try {
        const pages = await ourAlumniModel.find().sort({ createdAt: -1 });
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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

export const getOurAlumniDataByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const pages = await ourAlumniModel.find({ category }).sort({ createdAt: -1 });
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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
                if (profilePic) {
                    const publicId = profilePic.split('/').pop().split('.')[0];
                    await cloudinary.v2.uploader.destroy(publicId);
                }
                profilePic = await uploadToCloudinary(req.files.profilePic[0].path);
            }
            if (req.files.companyLogo) {
                if (companyLogo) {
                    const publicId = companyLogo.split('/').pop().split('.')[0];
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