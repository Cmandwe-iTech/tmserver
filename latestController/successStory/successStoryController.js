import successStoryModel from '../../latestModel/successStory/successStoryModel.js';
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

export const createSuccessStoryData = async (req, res) => {
    try {
        const { category, name, storyDesc, points } = req.body;
        console.log(req.body)
        let profilePic = '';
        if (req.files && req.files.profilePic) {
            const profilePicUrl = await uploadToCloudinary(req.files.profilePic[0].path);
            profilePic = profilePicUrl;
        }

        const successStory = new successStoryModel({
            category,
            name,
            storyDesc,
            points,
            profilePic
        });

        await successStory.save();
        res.status(201).json({ message: 'Success story data added successfully', successStory });
    } catch (error) {
        res.status(500).json({ message: 'Error creating success story data', error: error.message });
    }
};

export const getSuccessStoryData = async (req, res) => {
    try {
        const stories = await successStoryModel.find().sort({ createdAt: -1 });
        res.status(200).json(stories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteSuccessStoryDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const story = await successStoryModel.findByIdAndDelete(id);
        if (!story) return res.status(404).json({ error: 'Success story not found' });
        res.status(200).json({ message: 'Success story data deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getSuccessStoryDataByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const stories = await successStoryModel.find({ category }).sort({ createdAt: -1 });
        res.status(200).json(stories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const editSuccessStoryDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const existingStory = await successStoryModel.findById(id);
        if (!existingStory) return res.status(404).json({ error: 'Success story not found' });

        const { category, name, storyDesc, points } = req.body;
        let profilePic = existingStory.profilePic;

        if (req.files && req.files.profilePic) {
            const profilePicUrl = await uploadToCloudinary(req.files.profilePic[0].path);
            profilePic = profilePicUrl;
        }
        const updatedData = {
            category: category || existingStory.category,
            name: name || existingStory.name,
            storyDesc: storyDesc || existingStory.storyDesc,
            points: points || existingStory.points,
            profilePic
        };

        const updatedStory = await successStoryModel.findByIdAndUpdate(id, updatedData, { new: true });

        res.status(200).json({ message: 'Success story data updated successfully', updatedStory });
    } catch (error) {
        res.status(500).json({ message: 'Error updating success story data', error: error.message });
    }
};



