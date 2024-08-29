
import certificateModel from '../../latestModel/certificate/cerrtificateModel.js';
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

export const createCertificateData = async (req, res) => {
    try {
        const {
            category,
            rankDetails
        } = req.body;

        const parseData = {
            rankDetails: JSON.parse(rankDetails || '[]'),
        };

        let certificateImage = '';
        if (req.file) {
            const certificateImageUrl = await uploadToCloudinary(req.file.path);
            certificateImage = certificateImageUrl;
        }
        const certificatePage = new certificateModel({
            category,
            certificateImage,
            rankDetails: parseData.rankDetails,
        });

        await certificatePage.save();
        res.status(201).json({ message: 'Certificate data added successfully', certificatePage });
    } catch (error) {
        res.status(500).json({ message: 'Error creating certificate data', error: error.message });
    }
};

export const getCertificateData = async (req, res) => {
    try {
        const pages = await certificateModel.find().sort({ createdAt: -1 });
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteCertificateDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const page = await certificateModel.findByIdAndDelete(id);
        if (!page) return res.status(404).json({ error: 'Certificate not found' });
        res.status(200).json({ message: 'Certificate deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCertificateDataByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const pages = await certificateModel.find({ category }).sort({ createdAt: -1 });
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const editCertificateDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const { category, rankDetails } = req.body;
        const parsedRankDetails = JSON.parse(rankDetails || '[]');
        const existingData = await certificateModel.findById(id);
        if (!existingData) {
            return res.status(404).json({ message: 'Certificate not found' });
        }
        let certificateImageUrl = existingData.certificateImage;
        if (req.file) {
            console.log('New image detected, uploading...');
            try {
                const uploadResult = await uploadToCloudinary(req.file.path);
                certificateImageUrl = uploadResult; 
                console.log('New image uploaded successfully:', certificateImageUrl);
            } catch (uploadError) {
                console.error('Error uploading new image:', uploadError);
                return res.status(500).json({ message: 'Error uploading new image', error: uploadError.message });
            }
        } else {
            console.log('No new image provided, retaining existing image.');
        }

        const updateData = {
            category: category || existingData.category,
            rankDetails: parsedRankDetails || existingData.rankDetails,
            certificateImage: certificateImageUrl,
        };
        const updatedCertificate = await certificateModel.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json({ message: 'Certificate updated successfully', certificatePage: updatedCertificate });
    } catch (error) {
        console.error('Error updating certificate data:', error);
        res.status(500).json({ message: 'Error updating certificate data', error: error.message });
    }
};

