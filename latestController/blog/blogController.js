import blogModel from '../../latestModel/blogs/blogPageModel.js'; // adjust the path as necessary
import cloudinary from '../../middlware/cloudinary.js';
import fs from 'fs';

// Helper function to upload files to Cloudinary
const uploadToCloudinary = async (filePath) => {
    console.log(filePath, "filepath");
    const result = await cloudinary.v2.uploader.upload(filePath);
    fs.unlinkSync(filePath);
    return result.secure_url;
};

// Create a new blog
export const createBlog = async (req, res) => {
    try {
        const { category, blogTitle, readTime, date, views, blogCardData, headerData, articleData } = req.body;

        // Handle file uploads if any
        const handleFileUploads = async (fileKey, targetObject, propertyToUpdate) => {
            if (req.files && req.files[fileKey]) {
                const file = req.files[fileKey][0]; // assuming single file upload
                const imageUrl = await uploadToCloudinary(file.path);
                targetObject[propertyToUpdate] = imageUrl;
            }
        };

        let parseBlogCardData = JSON.parse(blogCardData);
        let parseHeaderData = JSON.parse(headerData);
        let parseArticleData = JSON.parse(articleData);

        await handleFileUploads('cardImage', parseBlogCardData, "cardImage");
        await handleFileUploads('headerBgImage', parseHeaderData, "headerBgImage");

        const newBlog = new blogModel({
            category,
            blogTitle,
            readTime,
            date,
            views,
            blogCardData: parseBlogCardData,
            headerData: parseHeaderData,
            articleData: parseArticleData
        });

        await newBlog.save();
        res.status(201).json({ message: 'Blog created', newBlog });

    } catch (error) {
        res.status(500).json({ message: 'Error creating blog', error: error.message });
    }
};

// Get all blogs
export const getBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving blogs', error: error.message });
    }
};

// Get a blog by ID
export const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving blog', error: error.message });
    }
};

// Get a blog by ID
export const getBlogByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const blog = await blogModel.find({ category: category });
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving blog', error: error.message });
    }
};

// Delete a blog by ID
export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the document by ID
        const blog = await blogModel.findById(id);

        // If document does not exist, return 404
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        // Delete the document
        await blogModel.findByIdAndDelete(id);

        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting blog', error: error.message });
    }
};

// Edit an existing blog
export const editBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { category, blogTitle, readTime, date, views, blogCardData, headerData, articleData } = req.body;

        // Find the existing blog
        const existingBlog = await blogModel.findById(id);
        if (!existingBlog) return res.status(404).json({ message: 'Blog not found' });

        // Handle file uploads if any
        const handleFileUploads = async (fileKey, targetObject, propertyToUpdate) => {
            if (req.files && req.files[fileKey]) {
                const file = req.files[fileKey][0]; // assuming single file upload
                const imageUrl = await uploadToCloudinary(file.path);
                targetObject[propertyToUpdate] = imageUrl;
            }
        };

        // Parse the provided data if necessary
        let parseBlogCardData = blogCardData ? JSON.parse(blogCardData) : existingBlog.blogCardData;
        let parseHeaderData = headerData ? JSON.parse(headerData) : existingBlog.headerData;
        let parseArticleData = articleData ? JSON.parse(articleData) : existingBlog.articleData;

        // Handle file uploads for cardImage and headerBgImage
        await handleFileUploads('cardImage', parseBlogCardData, 'cardImage');
        await handleFileUploads('headerBgImage', parseHeaderData, 'headerBgImage');

        // Update only the provided fields
        const updatedBlog = {
            category: category || existingBlog.category,
            blogTitle: blogTitle || existingBlog.blogTitle,
            readTime: readTime || existingBlog.readTime,
            date: date || existingBlog.date,
            views: views || existingBlog.views,
            blogCardData: parseBlogCardData,
            headerData: parseHeaderData,
            articleData: parseArticleData
        };

        // Save the updated blog
        const result = await blogModel.findByIdAndUpdate(id, updatedBlog, { new: true });
        res.status(200).json({ message: 'Blog updated successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Error updating blog', error: error.message });
    }
};