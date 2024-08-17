import ourTeamModel from '../../latestModel/ourTeam/ourTeamModel.js';
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

export const createOurTeamData = async (req, res) => {
    try {
        const { memberName, position } = req.body;

        let profilePic = '';
        if (req.files && req.files.profilePic) {
            const profilePicUrl = await uploadToCloudinary(req.files.profilePic[0].path);
            profilePic = profilePicUrl;
        }

        const ourTeamPage = new ourTeamModel({
            memberName,
            profilePic,
            position
        });

        await ourTeamPage.save();
        res.status(201).json({ message: 'Our Team data added successfully', ourTeamPage });
    } catch (error) {
        res.status(500).json({ message: 'Error creating our team data', error: error.message });
    }
};

// Get all our team data
export const getOurTeamData = async (req, res) => {
    try {
        const pages = await ourTeamModel.find().sort({ createdAt: -1 });
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete our team data by ID
export const deleteOurTeamDataById = async (req, res) => {
    try {
        const { id } = req.params;
        const page = await ourTeamModel.findByIdAndDelete(id);
        if (!page) return res.status(404).json({ error: 'Our Team data not found' });
        res.status(200).json({ message: 'Our Team data deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get our team data by member name
export const getOurTeamDataByMemberName = async (req, res) => {
    try {
        const { memberName } = req.query;
        const pages = await ourTeamModel.find({ memberName }).sort({ createdAt: -1 });
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const editOurTeamData = async (req, res) => {
    try {
        const { id } = req.params;
        const { memberName, position } = req.body;

        let profilePic = '';
        if (req.files && req.files.profilePic) {
            const profilePicUrl = await uploadToCloudinary(req.files.profilePic[0].path);
            profilePic = profilePicUrl;
        }

        const updatedData = {
            memberName,
            position,
        };

        if (profilePic) {
            updatedData.profilePic = profilePic;
        }

        const updatedTeamMember = await ourTeamModel.findByIdAndUpdate(
            id,
            updatedData,
            { new: true }
        );

        if (!updatedTeamMember) return res.status(404).json({ message: 'Team member not found' });

        res.status(200).json({ message: 'Team member updated successfully', updatedTeamMember });
    } catch (error) {
        res.status(500).json({ message: 'Error updating team member', error: error.message });
    }
};
