import fs from 'fs';
import cloudinary from '../../middlware/cloudinary.js';  // Ensure the correct path to your cloudinary middleware
import hireFromToolsCoveredModel from '../../latestModel/hirefromUs/toolsCovered.js'; // Ensure the correct path to your model

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
// Create a new tool covered entry
export const createToolCovered = async (req, res) => {
    try {
        const { category, ToolsCoveredtitle } = req.body;
        console.log(req.body)
        console.log(req.file)

        let ToolsCoveredicon = '';
        if (req.file) {
            ToolsCoveredicon = await uploadToCloudinary(req.file.path);
        }

        const newToolCovered = new hireFromToolsCoveredModel({
            category,
            ToolsCoveredicon,
            ToolsCoveredtitle,
        });

        const savedToolCovered = await newToolCovered.save();
        res.status(201).json({ message: 'Tool covered created successfully', savedToolCovered });

    } catch (error) {
        res.status(500).json({ message: 'Error creating tool covered', error: error.message });
    }
};

// Get all tools covered
export const getAllToolsCovered = async (req, res) => {
    try {
        const toolsCovered = await hireFromToolsCoveredModel.find();
        res.status(200).json(toolsCovered);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tools covered', error: error.message });
    }
};
// Get tools covered by category
export const getToolsCoveredByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        console.log(category)
        const toolsCovered = await hireFromToolsCoveredModel.find({ category:category });
        // if (!toolsCovered.length) {
        //     return res.status(404).json({ message: 'No tools covered found for this category' });
        // }
        res.status(200).json(toolsCovered);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tools covered by category', error: error.message });
    }
};
// Delete tool covered by ID
export const deleteToolCovered = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTool = await hireFromToolsCoveredModel.findByIdAndDelete(id);
        if (!deletedTool) {
            return res.status(404).json({ message: 'Tool covered not found' });
        }
        res.status(200).json({ message: 'Tool covered deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting tool covered', error: error.message });
    }
};

// Update a tool covered entry by ID
export const updateToolCovered = async (req, res) => {
    try {
        const { id } = req.params;
        const { category, ToolsCoveredtitle } = req.body;

        let ToolsCoveredicon = '';
        if (req.file) {
            ToolsCoveredicon = await uploadToCloudinary(req.file.path);
        }

        const updatedToolCovered = await hireFromToolsCoveredModel.findByIdAndUpdate(
            id,
            {
                category,
                ToolsCoveredicon: ToolsCoveredicon || undefined, // Only update if a new file is uploaded
                ToolsCoveredtitle
            },
            { new: true } // Return the updated document
        );

        if (!updatedToolCovered) {
            return res.status(404).json({ message: 'Tool covered not found' });
        }

        res.status(200).json({ message: 'Tool covered updated successfully', updatedToolCovered });
    } catch (error) {
        res.status(500).json({ message: 'Error updating tool covered', error: error.message });
    }
};
