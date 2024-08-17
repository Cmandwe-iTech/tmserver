import masterClassModel from '../../latestModel/masterClass/masterClassModel.js'; // adjust the path as necessary
import cloudinary from '../../middlware/cloudinary.js'; // fix the path if needed
import fs from 'fs';

// Helper function to upload files to Cloudinary
const uploadToCloudinary = async (filePath) => {
    const result = await cloudinary.v2.uploader.upload(filePath);
    fs.unlinkSync(filePath);
    return result.secure_url;
};

// Create a new master class
export const createMasterClass = async (req, res) => {
    try {
        console.log(req.body)
        const { category, cardData } = req.body;
        // Parse the cardData from JSON string
        let parseCardData = JSON.parse(cardData);

        // Handle file uploads if any
        const handleFileUploads = async (fileKey, targetObject, propertyToUpdate) => {
            if (req.files && req.files[fileKey]) {
                const file = req.files[fileKey][0]; // assuming single file upload
                const imageUrl = await uploadToCloudinary(file.path);
                targetObject[propertyToUpdate] = imageUrl;
            }
        };

        await handleFileUploads('companyLogo', parseCardData.mentorData, 'companyLog');
        await handleFileUploads('mentorProfile', parseCardData.mentorData, 'mentorProfile');
        await handleFileUploads('masterClassIcon', parseCardData.masterClassFor, 'Icon');

        const newMasterClass = new masterClassModel({
            category,
            cardData: parseCardData
        });

        await newMasterClass.save();
        res.status(201).json({ message: 'Master Class created', newMasterClass });

    } catch (error) {
        res.status(500).json({ message: 'Error creating Master Class', error: error.message });
    }
};

// Get all master classes
export const getMasterClasses = async (req, res) => {
    try {
        const masterClasses = await masterClassModel.find();
        res.status(200).json(masterClasses);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving Master Classes', error: error.message });
    }
};

// Get a master class by ID
export const getMasterClassById = async (req, res) => {
    try {
        const { id } = req.params;
        const masterClass = await masterClassModel.findById(id);
        if (!masterClass) return res.status(404).json({ message: 'Master Class not found' });
        res.status(200).json(masterClass);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving Master Class', error: error.message });
    }
};

// Get master classes by category
export const getMasterClassByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const masterClasses = await masterClassModel.find({ category });
        if (!masterClasses.length) return res.status(404).json({ message: 'Master Class not found' });
        res.status(200).json(masterClasses);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving Master Classes by category', error: error.message });
    }
};

// Update a master class by ID
export const updateMasterClass = async (req, res) => {
    try {

        const { id } = req.params;
        const { category, cardData } = req.body;

        // Parse the cardData from JSON string
        let parseCardData = JSON.parse(cardData);

        // Handle file uploads if any
        const handleFileUploads = async (fileKey, targetObject, propertyToUpdate) => {
            if (req.files && req.files[fileKey]) {
                const file = req.files[fileKey][0]; // assuming single file upload
                const imageUrl = await uploadToCloudinary(file.path);
                targetObject[propertyToUpdate] = imageUrl;
            }
        };

        await handleFileUploads('companyLogo', parseCardData.mentorData, 'companyLog');
        await handleFileUploads('masterClassIcon', parseCardData.masterClassFor, 'Icon');
        await handleFileUploads('mentorProfile', parseCardData.mentorData, 'mentorProfile');
        

        const updatedMasterClass = await masterClassModel.findByIdAndUpdate(
            id,
            { category, cardData: parseCardData },
            { new: true } // Return the updated document
        );

        if (!updatedMasterClass) return res.status(404).json({ message: 'Master Class not found' });

        res.status(200).json({ message: 'Master Class updated successfully', updatedMasterClass });

    } catch (error) {
        res.status(500).json({ message: 'Error updating Master Class', error: error.message });
    }
};

// Delete a master class by ID
export const deleteMasterClass = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the document by ID
        const masterClass = await masterClassModel.findById(id);

        // If document does not exist, return 404
        if (!masterClass) return res.status(404).json({ message: 'Master Class not found' });

        // Delete the document
        await masterClassModel.findByIdAndDelete(id);

        res.status(200).json({ message: 'Master Class deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Master Class', error: error.message });
    }
};

export const editMasterClass = async (req, res) => {
    try {

        const { id } = req.params;
        const { category, cardData } = req.body;
        console.log(req.body)
        const masterClass = await masterClassModel.findById(id);
        if (!masterClass) return res.status(404).json({ error: 'Master Class not found' });

        // Update fields if they are provided in the request
        masterClass.category = category || masterClass.category;
        masterClass.cardData.masterClassTitle = cardData.masterClassTitle || masterClass.cardData.masterClassTitle;
        masterClass.cardData.masterClassSubTitle = cardData.masterClassSubTitle || masterClass.cardData.masterClassSubTitle;
        masterClass.cardData.startDate = cardData.startDate || masterClass.cardData.startDate;
        masterClass.cardData.endDate = cardData.endDate || masterClass.cardData.endDate;
        masterClass.cardData.venue = cardData.venue || masterClass.cardData.venue;
        masterClass.cardData.whatYouWillGain = cardData.whatYouWillGain || masterClass.cardData.whatYouWillGain;

        masterClass.cardData.mentorData.mentorName = cardData.mentorName || masterClass.cardData.mentorData.mentorName;
        masterClass.cardData.mentorData.jobRole = cardData.jobRole || masterClass.cardData.mentorData.jobRole;
        masterClass.cardData.mentorData.company = cardData.company || masterClass.cardData.mentorData.company;
        masterClass.cardData.mentorData.yearOfExperience = cardData.yearOfExperience || masterClass.cardData.mentorData.yearOfExperience;
        masterClass.cardData.mentorData.experiencePoint = cardData.experiencePoint || masterClass.cardData.mentorData.experiencePoint;

        masterClass.cardData.masterClassFor.title = cardData.title || masterClass.cardData.masterClassFor.title;

        // Handle file uploads if they exist in the request
        if (req.files && req.files.companyLogo) {
            const companyLogoUrl = await uploadToCloudinary(req.files.companyLogo[0].path);
            masterClass.cardData.mentorData.companyLog = companyLogoUrl;
        }

        if (req.files && req.files.mentorProfile) {
            const mentorProfileUrl = await uploadToCloudinary(req.files.mentorProfile[0].path);
            masterClass.cardData.mentorData.mentorProfile = mentorProfileUrl;
        }

        if (req.files && req.files.masterClassIcon) {
            const masterClassIconUrl = await uploadToCloudinary(req.files.masterClassIcon[0].path);
            masterClass.cardData.masterClassFor.Icon = masterClassIconUrl;
        }

        await masterClass.save();
        console.log("object", masterClass)
        res.status(200).json({ message: 'Master Class updated successfully', masterClass });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};