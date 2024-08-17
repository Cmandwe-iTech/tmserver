import testimonialsModel from '../../latestModel/testimonials/testimonials.js';
import cloudinary from '../../middlware/cloudinary.js';
import fs from 'fs';

// Helper function to upload files to Cloudinary
const uploadToCloudinary = async (filePath) => {
    try {
        console.log("Uploading to Cloudinary: ", filePath);
        const result = await cloudinary.v2.uploader.upload(filePath, {
            resource_type: "auto" // Auto-detect the file type (video, image, etc.)
        });
        console.log("Upload successful: ", result.secure_url);
        fs.unlinkSync(filePath); // remove file from local storage after uploading
        return result.secure_url;
    } catch (error) {
        console.error(`Error uploading file to Cloudinary: ${error.message}`);
        throw new Error(`Error uploading file to Cloudinary: ${error.message}`);
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

// Get all testimonials data
export const getTestimonialsData = async (req, res) => {
    try {
        const testimonials = await testimonialsModel.find().sort({ createdAt: -1 });
        res.status(200).json(testimonials);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete testimonial data by ID
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

// Get testimonials data by category
export const getTestimonialsDataByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const testimonials = await testimonialsModel.find({ category }).sort({ createdAt: -1 });
        res.status(200).json(testimonials);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update testimonial data by ID
export const updateTestimonialsData = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch the existing testimonial data
        const existingTestimonial = await testimonialsModel.findById(id);
        if (!existingTestimonial) return res.status(404).json({ error: 'Testimonial not found' });

        const { category, studentName, position, review, reviewPoints } = req.body;

        // Initialize variables for new data
        let reviewVideo = existingTestimonial.reviewVideo;
        let profilePic = existingTestimonial.profilePic;

        // Check if new files are uploaded and update them accordingly
        if (req.files && req.files.reviewVideo) {
            const reviewVideoUrl = await uploadToCloudinary(req.files.reviewVideo[0].path);
            reviewVideo = reviewVideoUrl;
        }

        if (req.files && req.files.profilePic) {
            const profilePicUrl = await uploadToCloudinary(req.files.profilePic[0].path);
            profilePic = profilePicUrl;
        }

        // Merge new data with existing data
        const updatedData = {
            category: category || existingTestimonial.category,
            studentName: studentName || existingTestimonial.studentName,
            profilePic,
            position: position || existingTestimonial.position,
            review: review || existingTestimonial.review,
            reviewPoints: reviewPoints || existingTestimonial.reviewPoints,
            reviewVideo
        };

        // Update the testimonial in the database
        const testimonial = await testimonialsModel.findByIdAndUpdate(id, updatedData, { new: true });

        res.status(200).json({ message: 'Testimonial data updated successfully', testimonial });
    } catch (error) {
        res.status(500).json({ message: 'Error updating testimonial data', error: error.message });
    }
};

