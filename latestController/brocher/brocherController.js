import fs from 'fs';
import cloudinary from '../../middlware/cloudinary.js'; // Adjust the path to your cloudinary middleware
import broucherModel from '../../latestModel/brocherModel/brocherModel.js' // Adjust the path to your model

// Helper function to upload files to Cloudinary
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

// Create a new brochure entry
export const createBroucher = async (req, res) => {
    try {
        const { category, subCategory } = req.body;

        let brocher = '';
        if (req.file) {
            brocher = await uploadToCloudinary(req.file.path);
        }

        const newBroucher = new broucherModel({
            category,
            subCategory,
            brocher,
        });

        const savedBroucher = await newBroucher.save();
        res.status(201).json({ message: 'Brochure created successfully', savedBroucher });

    } catch (error) {
        res.status(500).json({ message: 'Error creating brochure', error: error.message });
    }
};

// Fetch all brochures
export const getAllBrouchers = async (req, res) => {
    try {
        const brouchers = await broucherModel.find();
        res.status(200).json(brouchers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching brochures', error: error.message });
    }
};

// Fetch a single brochure by ID
export const getBroucherById = async (req, res) => {
    try {
        const broucher = await broucherModel.findById(req.params.id);
        if (!broucher) {
            return res.status(404).json({ message: 'Brochure not found' });
        }
        res.status(200).json(broucher);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching brochure', error: error.message });
    }
};
// Fetch a single brochure by Cate
export const getBroucherByCategory = async (req, res) => {
    try {

        const broucher = await broucherModel.find({ category: req.params.category });
        if (!broucher) {
            return res.status(404).json({ message: 'Brochure not found' });
        }
        res.status(200).json(broucher);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching brochure', error: error.message });
    }
};

// Delete a brochure by ID
export const deleteBroucherById = async (req, res) => {
    try {
        const broucher = await broucherModel.findByIdAndDelete(req.params.id);
        if (!broucher) {
            return res.status(404).json({ message: 'Brochure not found' });
        }
        res.status(200).json({ message: 'Brochure deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting brochure', error: error.message });
    }
};

// Update a brochure by ID
export const updateBroucherById = async (req, res) => {
    console.log("first")
    try {
        const { id } = req.params;
        const { category, subCategory } = req.body;
        const existingBroucher = await broucherModel.findById(id);

        const updateData = {
            category: category || existingBroucher.category,
            subCategory: subCategory || existingBroucher.subCategory,
            brocher: existingBroucher.brocher,
        };
        if (req.file) {
            updateData.brocher = await uploadToCloudinary(req.file.path);
        }
        const updatedBroucher = await broucherModel.findByIdAndUpdate(id, updateData, { new: true });

        res.status(200).json({ message: 'Brochure updated successfully', updatedBroucher });
    } catch (error) {
        res.status(500).json({ message: 'Error updating brochure', error: error.message });
    }
};
