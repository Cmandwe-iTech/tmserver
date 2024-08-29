import blogModel from '../../latestModel/blogs/blogPageModel.js';
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

export const createBlog = async (req, res) => {
    try {
        const { category, blogTitle, readTime, date, views, blogCardData, headerData, articleData } = req.body;

        const handleFileUploads = async (fileKey, targetObject, propertyToUpdate) => {
            if (req.files && req.files[fileKey]) {
                const file = req.files[fileKey][0];
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

export const getBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving blogs', error: error.message });
    }
};

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

export const getBlogByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const blog = await blogModel.find({ category: category });
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving blog', error: error.message });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        await blogModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting blog', error: error.message });
    }
};

export const editBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { category, blogTitle, readTime, date, views, blogCardData, headerData, articleData } = req.body;
        const existingBlog = await blogModel.findById(id);
        if (!existingBlog) return res.status(404).json({ message: 'Blog not found' });

        const handleFileUploads = async (fileKey, targetObject, propertyToUpdate) => {
            if (req.files && req.files[fileKey]) {
                const file = req.files[fileKey][0];
                const imageUrl = await uploadToCloudinary(file.path);
                targetObject[propertyToUpdate] = imageUrl;
            }
        };

        let parseBlogCardData = blogCardData ? JSON.parse(blogCardData) : existingBlog.blogCardData;
        let parseHeaderData = headerData ? JSON.parse(headerData) : existingBlog.headerData;
        let parseArticleData = articleData ? JSON.parse(articleData) : existingBlog.articleData;

        await handleFileUploads('cardImage', parseBlogCardData, 'cardImage');
        await handleFileUploads('headerBgImage', parseHeaderData, 'headerBgImage');

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
        
        const result = await blogModel.findByIdAndUpdate(id, updatedBlog, { new: true });
        res.status(200).json({ message: 'Blog updated successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Error updating blog', error: error.message });
    }
};