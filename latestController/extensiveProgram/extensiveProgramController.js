import cloudinary from '../../middlware/cloudinary.js';
import fs from 'fs'
import extensiveProgramModel from '../../latestModel/extensiveProgram/extensiveProgramModel.js';

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

export const createExtensiveProgram = async (req, res) => {
    try {
        const { Category, cardData, headerData, highlights, courseCurriculam, skillYouLearn, topInDemandTools, FeesStuctures } = req.body;
        console.log(req.body)
        let parseCardData, parseHeaderData, parseHighlights, parseCourseCurriculam, parseTopInDemandTools, parseFeesStuctures;

        try {
            parseCardData = typeof cardData === 'string' ? JSON.parse(cardData) : cardData;
            parseHeaderData = typeof headerData === 'string' ? JSON.parse(headerData) : headerData;
            parseHighlights = typeof highlights === 'string' ? JSON.parse(highlights) : highlights;
            parseCourseCurriculam = typeof courseCurriculam === 'string' ? JSON.parse(courseCurriculam) : courseCurriculam;
            parseTopInDemandTools = typeof topInDemandTools === 'string' ? JSON.parse(topInDemandTools) : topInDemandTools;
            parseFeesStuctures = typeof FeesStuctures === 'string' ? JSON.parse(FeesStuctures) : FeesStuctures;
        } catch (error) {
            return res.status(400).json({ message: 'Invalid JSON format in request body', error: error.message });
        }

        const handleFileUploads = async (fileKey, targetArray, propertyToUpdate) => {
            if (req.files && req.files[fileKey]) {
                for (let i = 0; i < req.files[fileKey].length; i++) {
                    const file = req.files[fileKey][i];
                    const imageUrl = await uploadToCloudinary(file.path);
                    if (targetArray[i]) {
                        targetArray[i][propertyToUpdate] = imageUrl;
                    }
                }
            }
        };

        await handleFileUploads('headerImage', [parseHeaderData], "headerBgImage");
        await handleFileUploads('highlightsIcon', parseHighlights.highlightPoints, "icon");
        await handleFileUploads('topInDemandToolsLogo', parseTopInDemandTools, "logo");


        const newExtensiveProgram = new extensiveProgramModel({
            Category,
            cardData: parseCardData,
            headerData: parseHeaderData,
            highlights: parseHighlights,
            courseCurriculam: parseCourseCurriculam,
            skillYouLearn,
            topInDemandTools: parseTopInDemandTools,
            FeesStuctures: parseFeesStuctures,
        });

        await newExtensiveProgram.save();
        res.status(201).json({ message: 'Extensive program created', newExtensiveProgram });

    } catch (error) {
        res.status(500).json({ message: 'Error creating Extensive program Page', error: error.message });
    }
};

export const getAllExtensiveProgram = async (req, res) => {
    try {
        const pages = await extensiveProgramModel.find();
        res.status(200).json(pages);
    } catch (error) {
        res.status(500).json({ message: 'Error creating Extensive program Page', error: error.message });
    }
}

export const getExtensiveProgramByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const page = await extensiveProgramModel.find({ Category: category })
        res.status(200).json(page)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getExtensiveProgramById = async (req, res) => {
    try {
        const { id } = req.params;
        const page = await extensiveProgramModel.findOne({ _id: id })
        res.status(200).json(page)

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteExtensiveProgramPage = async (req, res) => {
    try {
        const { id } = req.params;
        const page = await extensiveProgramModel.findById(id);
        if (!page) return res.status(404).json({ error: 'Extensive program Page not found' });
        await extensiveProgramModel.findByIdAndDelete(id);
        
        res.status(200).json({ message: 'Extensive program Page deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateExtensiveProgram = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            Category,
            cardData,
            headerData,
            highlights,
            courseCurriculam,
            skillYouLearn,
            topInDemandTools,
            FeesStuctures
        } = req.body;

        let parseCardData, parseHeaderData, parseHighlights, parseCourseCurriculam, parseTopInDemandTools, parseFeesStuctures;

        try {
            parseCardData = typeof cardData === 'string' ? JSON.parse(cardData) : cardData;
            parseHeaderData = typeof headerData === 'string' ? JSON.parse(headerData) : headerData;
            parseHighlights = typeof highlights === 'string' ? JSON.parse(highlights) : highlights;
            parseCourseCurriculam = typeof courseCurriculam === 'string' ? JSON.parse(courseCurriculam) : courseCurriculam;
            parseTopInDemandTools = typeof topInDemandTools === 'string' ? JSON.parse(topInDemandTools) : topInDemandTools;
            parseFeesStuctures = typeof FeesStuctures === 'string' ? JSON.parse(FeesStuctures) : FeesStuctures;
        } catch (error) {
            return res.status(400).json({ message: 'Invalid JSON format in request body', error: error.message });
        }

        // Fetch the existing program data
        const existingProgram = await extensiveProgramModel.findById(id);

        if (!existingProgram) {
            return res.status(404).json({ message: 'Program not found' });
        }

        const handleFileUploads = async (fileKey, targetArray, propertyToUpdate) => {
            if (req.files && req.files[fileKey]) {
                for (let i = 0; i < req.files[fileKey].length; i++) {
                    const file = req.files[fileKey][i];
                    const imageUrl = await uploadToCloudinary(file.path);
                    if (targetArray[i]) {
                        targetArray[i][propertyToUpdate] = imageUrl;
                    }
                }
            }
        };

        // Handle file uploads
        await handleFileUploads('headerImage', [parseHeaderData], "headerBgImage");
        await handleFileUploads('highlightsIcon', parseHighlights ? parseHighlights.highlightPoints : [], "icon");
        await handleFileUploads('topInDemandToolsLogo', parseTopInDemandTools, "logo");

        // Prepare update data by merging with existing fields
        const updateData = {
            Category: Category || existingProgram.Category,
            cardData: parseCardData || existingProgram.cardData,
            headerData: parseHeaderData || existingProgram.headerData,
            highlights: parseHighlights || existingProgram.highlights,
            courseCurriculam: parseCourseCurriculam || existingProgram.courseCurriculam,
            skillYouLearn: skillYouLearn || existingProgram.skillYouLearn,
            topInDemandTools: parseTopInDemandTools || existingProgram.topInDemandTools,
            FeesStuctures: parseFeesStuctures || existingProgram.FeesStuctures
        };

        const updatedProgram = await extensiveProgramModel.findByIdAndUpdate(id, updateData, { new: true });

        res.status(200).json({ message: 'Extensive program updated', updatedProgram });

    } catch (error) {
        res.status(500).json({ message: 'Error updating Extensive program', error: error.message });
    }
};
