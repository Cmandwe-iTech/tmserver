import fs from 'fs';
import cloudinary from '../../middlware/cloudinary.js'; // Update the path if needed
import hireFromTechnicalHighlightsModel from '../../latestModel/hirefromUs/technicalHighlights.js';

// Helper function to upload files to Cloudinary
const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.v2.uploader.upload(filePath);
        // Use unlink (async) instead of unlinkSync and provide a callback
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
        throw error; // Rethrow the error to be handled by the caller
    }
};

// Create a new technical highlight
export const createTechnicalHighlight = async (req, res) => {
    try {
        const { category, technicalHighLighttitle } = req.body;
        
        // Handle file upload for the technical highlight icon
        let technicalHighLighticon = '';
        if (req.file && req.file.path) {
            technicalHighLighticon = await uploadToCloudinary(req.file.path);
        }

        const newHighlight = new hireFromTechnicalHighlightsModel({
            category,
            technicalHighLighticon,
            technicalHighLighttitle,
        });

        const savedHighlight = await newHighlight.save();
        res.status(201).json({ message: 'Technical Highlight created successfully', savedHighlight });

    } catch (error) {
        res.status(500).json({ message: 'Error creating Technical Highlight', error: error.message });
    }
};
// Get all technical highlights
export const getAllTechnicalHighlights = async (req, res) => {
    try {
        const highlights = await hireFromTechnicalHighlightsModel.find();
        res.status(200).json(highlights);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching technical highlights', error: error.message });
    }
};

// Get technical highlights by category
export const getTechnicalHighlightsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const highlights = await hireFromTechnicalHighlightsModel.find({ category });
        if (!highlights.length) {
            return res.status(404).json({ message: 'No highlights found for this category' });
        }
        res.status(200).json(highlights);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching technical highlights by category', error: error.message });
    }
};
// Delete technical highlight by ID
export const deleteTechnicalHighlight = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedHighlight = await hireFromTechnicalHighlightsModel.findByIdAndDelete(id);
        if (!deletedHighlight) {
            return res.status(404).json({ message: 'Highlight not found' });
        }
        res.status(200).json({ message: 'Highlight deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting technical highlight', error: error.message });
    }
};

// Update a technical highlight by ID
export const updateTechnicalHighlight = async (req, res) => {
    try {
        const { id } = req.params;
        const { category, technicalHighLighttitle } = req.body;

        // Find the existing highlight
        const highlight = await hireFromTechnicalHighlightsModel.findById(id);
        if (!highlight) {
            return res.status(404).json({ message: 'Technical Highlight not found' });
        }

        // Update fields if they are provided in the request
        highlight.category = category ?? highlight.category;
        highlight.technicalHighLighttitle = technicalHighLighttitle ?? highlight.technicalHighLighttitle;

        // Handle file upload if a new file is provided
        if (req.file && req.file.path) {
            // Upload new file to Cloudinary
            const newIconUrl = await uploadToCloudinary(req.file.path);

            // Update icon field
            highlight.technicalHighLighticon = newIconUrl;
        }

        // Save the updated highlight
        const updatedHighlight = await highlight.save();
        res.status(200).json({ message: 'Technical Highlight updated successfully', updatedHighlight });

    } catch (error) {
        res.status(500).json({ message: 'Error updating Technical Highlight', error: error.message });
    }
};
