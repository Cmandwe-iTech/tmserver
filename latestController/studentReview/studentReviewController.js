import studentReviewModel from '../../latestModel/studentReview/studentReviewModel.js';
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

export const createStudentReviewData = async (req, res) => {
    try {
        const { category, studentName, jobRole, companyName, review, importantPoints } = req.body;

        let profilePic = '';
        if (req.files && req.files.profilePic) {
            const profilePicUrl = await uploadToCloudinary(req.files.profilePic[0].path);
            profilePic = profilePicUrl;
        }

        const studentReview = new studentReviewModel({
            category,
            studentName,
            profilePic,
            jobRole,
            companyName,
            review,
            importantPoints
        });

        await studentReview.save();
        res.status(201).json({ message: 'Student review data added successfully', studentReview });
    } catch (error) {
        res.status(500).json({ message: 'Error creating student review data', error: error.message });
    }
};

// Get all student review data
export const getStudentReviewData = async (req, res) => {
    try {
        const reviews = await studentReviewModel.find().sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete student review data by ID
export const deleteStudentReviewDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await studentReviewModel.findByIdAndDelete(id);
        if (!review) return res.status(404).json({ error: 'Student review not found' });
        res.status(200).json({ message: 'Student review data deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get student review data by category
export const getStudentReviewDataByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const reviews = await studentReviewModel.find({ category }).sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const editStudentReviewDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const { category, studentName, jobRole, companyName, review, importantPoints } = req.body;

        // Fetch existing review data
        const existingReview = await studentReviewModel.findById(id);
        if (!existingReview) return res.status(404).json({ message: 'Student review not found' });

        // Handle profile picture upload if a new file is provided
        let profilePic = existingReview.profilePic; // Default to existing profile picture
        if (req.files && req.files.profilePic) {
            const profilePicUrl = await uploadToCloudinary(req.files.profilePic[0].path);
            profilePic = profilePicUrl;
        }

        // Update review data
        const studentReview = await studentReviewModel.findByIdAndUpdate(
            id,
            {
                category: category || existingReview.category,
                studentName: studentName || existingReview.studentName,
                profilePic,
                jobRole: jobRole || existingReview.jobRole,
                companyName: companyName || existingReview.companyName,
                review: review || existingReview.review,
                importantPoints: importantPoints || existingReview.importantPoints
            },
            { new: true }
        );

        res.status(200).json({ message: 'Student review data updated successfully', studentReview });
    } catch (error) {
        res.status(500).json({ message: 'Error updating student review data', error: error.message });
    }
};