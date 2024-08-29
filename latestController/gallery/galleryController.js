import galleryModel from '../../latestModel/gallery/galleryModel.js';
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

export const createGalleryData = async (req, res) => {
    try {
        const { category, eventName } = req.body;

        let eventImage = '';
        if (req.files && req.files.eventImage) {
            const eventImageUrl = await uploadToCloudinary(req.files.eventImage[0].path);
            eventImage = eventImageUrl;
        }

        const galleryPage = new galleryModel({
            category,
            eventName,
            eventImage
        });

        await galleryPage.save();
        res.status(201).json({ message: 'Gallery data added successfully', galleryPage });
    } catch (error) {
        res.status(500).json({ message: 'Error creating gallery data', error: error.message });
    }
};

export const getGalleryData = async (req, res) => {
    try {
        const pages = await galleryModel.find().sort({ createdAt: -1 });
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteGalleryDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const page = await galleryModel.findByIdAndDelete(id);
        if (!page) return res.status(404).json({ error: 'Gallery data not found' });
        res.status(200).json({ message: 'Gallery data deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getGalleryDataByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const pages = await galleryModel.find({ category }).sort({ createdAt: -1 });
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const editGalleryDataById = async (req, res) => {
    try {
        const { id } = req.params;

        const existingGallery = await galleryModel.findById(id);
        if (!existingGallery) return res.status(404).json({ error: 'Gallery data not found' });

        const { category, eventName } = req.body;

        let eventImage = existingGallery.eventImage;

        if (req.files && req.files.eventImage) {
            const eventImageUrl = await uploadToCloudinary(req.files.eventImage[0].path);
            eventImage = eventImageUrl;
        }

        const updatedData = {
            category: category || existingGallery.category,
            eventName: eventName || existingGallery.eventName,
            eventImage
        };

        const updatedGallery = await galleryModel.findByIdAndUpdate(id, updatedData, { new: true });

        res.status(200).json({ message: 'Gallery data updated successfully', updatedGallery });
    } catch (error) {
        res.status(500).json({ message: 'Error updating gallery data', error: error.message });
    }
};

