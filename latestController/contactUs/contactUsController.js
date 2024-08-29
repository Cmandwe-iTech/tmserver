import contactUsModel from "../../latestModel/contactUs/contactUsPageModel.js";
import cloudinary from '../../middlware/cloudinary.js';
import fs from 'fs'

export const createContactUsData = async (req, res) => {
  try {
    const { address, enquiry, forGrievance, ForCorporate } = req.body;
    console.log(req.body)
    let buildingImg = '';

    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path);
      fs.unlinkSync(req.file.path);
      buildingImg = result.secure_url;
    }

    const contactUsEntry = new contactUsModel({
      address,
      enquiry,
      forGrievance,
      ForCorporate,
      buildingImg,
    });

    await contactUsEntry.save();
    res.status(201).json({ message: 'Contact Us data added successfully', contactUsEntry });
  } catch (error) {
    res.status(500).json({ message: 'Error creating Contact Us data', error: error.message });
  }
};

export const getContactUsData = async (req, res) => {
  try {
    const contactUsEntries = await contactUsModel.find();
    res.status(200).json(contactUsEntries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteContactUsDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const contactUsEntry = await contactUsModel.findByIdAndDelete(id);
    if (!contactUsEntry) return res.status(404).json({ error: 'Contact Us data not found' });
    res.status(200).json({ message: 'Contact Us data deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getContactUsDataByAddress = async (req, res) => {
  try {
    const { address } = req.query;
    const contactUsEntries = await contactUsModel.find({ address: new RegExp(address, 'i') });
    res.status(200).json(contactUsEntries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateContactUsDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path);
      updates.buildingImg = result.secure_url;
    }

    const contactUsEntry = await contactUsModel.findByIdAndUpdate(id, updates, { new: true });
    if (!contactUsEntry) return res.status(404).json({ error: 'Contact Us data not found' });
    res.status(200).json({ message: 'Contact Us data updated successfully', contactUsEntry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
