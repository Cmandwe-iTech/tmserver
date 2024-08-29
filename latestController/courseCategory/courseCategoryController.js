import { categoryModel } from "../../latestModel/courseCategory/categoryModel.js";
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

export const createCourseCategory = async (req, res) => {
    console.log("Request received");
    try {
        const { courseCategory, homeCard, headerData, courseStatistics } = req.body;

        let parseHomeCard = JSON.parse(homeCard || '{}');
        let parseHeaderData = JSON.parse(headerData || '{}');
        let parseCourseStatistics = JSON.parse(courseStatistics || '{}');

        const handleObjectFileUploads = async (fileKey, targetObject, propertyToUpdate) => {
            if (req.files && req.files[fileKey]) {
                const file = req.files[fileKey][0];
                const imageUrl = await uploadToCloudinary(file.path);
                targetObject[propertyToUpdate] = imageUrl;
            }
        };

        await handleObjectFileUploads('headerImage', parseHeaderData, "headerBgImage");
        await handleObjectFileUploads('homeCardIcon', parseHomeCard, "icon");

        const newCourseCategory = new categoryModel({
            courseCategory,
            homeCard: parseHomeCard,
            headerData: parseHeaderData,
            courseStatistics: parseCourseStatistics,
        });

        await newCourseCategory.save();
        res.status(201).json({ message: "Created course category successfully", newCourseCategory });
    } catch (error) {
        console.error('Error creating course category:', error);
        res.status(500).json({ message: 'Error creating course category', error: error.message });
    }
};

export const editCourseCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { courseCategory, homeCard, headerData, courseStatistics } = req.body;

        let parseHomeCard = JSON.parse(homeCard || '{}');
        let parseHeaderData = JSON.parse(headerData || '{}');
        let parseCourseStatistics = JSON.parse(courseStatistics || '{}');

        const handleObjectFileUploads = async (fileKey, targetObject, propertyToUpdate) => {
            if (req.files && req.files[fileKey]) {
                const file = req.files[fileKey][0];
                const imageUrl = await uploadToCloudinary(file.path);
                targetObject[propertyToUpdate] = imageUrl;
            }
        };

        // Only update the image if a new one is provided
        await handleObjectFileUploads('headerImage', parseHeaderData, "headerBgImage");
        await handleObjectFileUploads('homeCardIcon', parseHomeCard, "icon");

        // Fetch the existing document to preserve non-updated fields
        const existingCategory = await categoryModel.findById(id);
        if (!req.files || !req.files['headerImage']) {
            parseHeaderData.headerBgImage = existingCategory.headerData.headerBgImage;
        }
        if (!req.files || !req.files['homeCardIcon']) {
            parseHomeCard.icon = existingCategory.homeCard.icon;
        }

        const updatedCourseCategory = await categoryModel.findByIdAndUpdate(
            id,
            {
                courseCategory,
                homeCard: parseHomeCard,
                headerData: parseHeaderData,
                courseStatistics: parseCourseStatistics,
            },
            { new: true }
        );

        res.status(200).json({ message: "Updated course category successfully", updatedCourseCategory });
    } catch (error) {
        console.error('Error updating course category:', error);
        res.status(500).json({ message: 'Error updating course category', error: error.message });
    }
};


export const getAllCourseCategory = async (req, res) => {
    try {
        const pages = await categoryModel.find();
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCourseByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const page = await categoryModel.findOne({ courseCategory: category });
        res.status(200).json(page);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCourseByCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const page = await categoryModel.findOne({ _id: id });
        res.status(200).json(page);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteCourseCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const page = await categoryModel.findById(id);
        if (!page) return res.status(404).json({ error: 'Category is not found' });
        await categoryModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Course category page deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
