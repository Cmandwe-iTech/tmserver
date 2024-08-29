import testimonialsModel from '../../latestModel/testimonials/testimonials.js';
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

export const createTestimonialsData = async (req, res) => {
    try {
        const { category, studentName, position, review, reviewPoints } = req.body;
        let reviewVideo = '';
        let profilePic = '';
        if (req.files && req.files.reviewVideo) {
            const reviewVideoUrl = await uploadToCloudinary(req.files.reviewVideo[0].path);
            reviewVideo = reviewVideoUrl;
        }
        if (req.files && req.files.profilePic) {
            const profilePicUrl = await uploadToCloudinary(req.files.profilePic[0].path);
            profilePic = profilePicUrl;
        }

        const testimonialsEntry = new testimonialsModel({
            category,
            studentName,
            profilePic,
            position,
            review,
            reviewPoints,
            reviewVideo
        });

        await testimonialsEntry.save();
        res.status(201).json({ message: 'Testimonial data added successfully', testimonialsEntry });
    } catch (error) {
        res.status(500).json({ message: 'Error creating testimonial data', error: error.message });
    }
};

export const getTestimonialsData = async (req, res) => {
    try {
        const testimonials = await testimonialsModel.find().sort({ createdAt: -1 });
        res.status(200).json(testimonials);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteTestimonialsDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const testimonial = await testimonialsModel.findByIdAndDelete(id);
        if (!testimonial) return res.status(404).json({ error: 'Testimonial not found' });
        res.status(200).json({ message: 'Testimonial data deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getTestimonialsDataByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const testimonials = await testimonialsModel.find({ category }).sort({ createdAt: -1 });
        res.status(200).json(testimonials);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateTestimonialsData = async (req, res) => {
    try {
        const { id } = req.params;
        const existingTestimonial = await testimonialsModel.findById(id);
        if (!existingTestimonial) return res.status(404).json({ error: 'Testimonial not found' });
        const { category, studentName, position, review, reviewPoints } = req.body;
        let reviewVideo = existingTestimonial.reviewVideo;
        let profilePic = existingTestimonial.profilePic;
        if (req.files && req.files.reviewVideo) {
            const reviewVideoUrl = await uploadToCloudinary(req.files.reviewVideo[0].path);
            reviewVideo = reviewVideoUrl;
        }

        if (req.files && req.files.profilePic) {
            const profilePicUrl = await uploadToCloudinary(req.files.profilePic[0].path);
            profilePic = profilePicUrl;
        }

        const updatedData = {
            category: category || existingTestimonial.category,
            studentName: studentName || existingTestimonial.studentName,
            profilePic,
            position: position || existingTestimonial.position,
            review: review || existingTestimonial.review,
            reviewPoints: reviewPoints || existingTestimonial.reviewPoints,
            reviewVideo
        };

        const testimonial = await testimonialsModel.findByIdAndUpdate(id, updatedData, { new: true });

        res.status(200).json({ message: 'Testimonial data updated successfully', testimonial });
    } catch (error) {
        res.status(500).json({ message: 'Error updating testimonial data', error: error.message });
    }
};

