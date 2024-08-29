import studentReviewModel from '../../latestModel/studentReview/studentReviewModel.js';
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

export const getStudentReviewData = async (req, res) => {
    try {
        const reviews = await studentReviewModel.find().sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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
        const existingReview = await studentReviewModel.findById(id);
        if (!existingReview) return res.status(404).json({ message: 'Student review not found' });

        let profilePic = existingReview.profilePic; 
        if (req.files && req.files.profilePic) {
            const profilePicUrl = await uploadToCloudinary(req.files.profilePic[0].path);
            profilePic = profilePicUrl;
        }

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