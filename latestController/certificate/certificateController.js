
import certificateModel from '../../latestModel/certificate/cerrtificateModel.js';
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

// ... other controller methods remain the same


// Get all certificate data
export const getCertificateData = async (req, res) => {
    try {
        const pages = await certificateModel.find().sort({ createdAt: -1 });
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete certificate data by ID
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

// Get certificate data by category
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

        // Parse rankDetails from JSON
        const parsedRankDetails = JSON.parse(rankDetails || '[]');

        // Fetch the existing certificate data
        const existingData = await certificateModel.findById(id);
        if (!existingData) {
            return res.status(404).json({ message: 'Certificate not found' });
        }

        // Initialize certificateImageUrl to the existing image URL
        let certificateImageUrl = existingData.certificateImage;

        // Check if a new image is provided
        if (req.file) {
            console.log('New image detected, uploading...');
            try {
                // Upload new image and get the URL
                const uploadResult = await uploadToCloudinary(req.file.path);
                certificateImageUrl = uploadResult; // Update with the new image URL
                console.log('New image uploaded successfully:', certificateImageUrl);
            } catch (uploadError) {
                console.error('Error uploading new image:', uploadError);
                return res.status(500).json({ message: 'Error uploading new image', error: uploadError.message });
            }
        } else {
            console.log('No new image provided, retaining existing image.');
        }

        // Prepare the update data
        const updateData = {
            category: category || existingData.category,
            rankDetails: parsedRankDetails || existingData.rankDetails,
            certificateImage: certificateImageUrl, // Set the image URL (new or existing)
        };

        // Update the certificate data
        const updatedCertificate = await certificateModel.findByIdAndUpdate(id, updateData, { new: true });
        
        res.status(200).json({ message: 'Certificate updated successfully', certificatePage: updatedCertificate });
    } catch (error) {
        console.error('Error updating certificate data:', error);
        res.status(500).json({ message: 'Error updating certificate data', error: error.message });
    }
};

