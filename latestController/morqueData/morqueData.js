import morqueDataModel from '../../latestModel/morqueModel/morqueModel.js'; 

export const createMorqueData = async (req, res) => {
  try {
    const morqueData = new morqueDataModel(req.body);
    await morqueData.save();
    res.status(201).json(morqueData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllMorqueData = async (req, res) => {
  try {
    const morqueData = await morqueDataModel.find();
    res.status(200).json(morqueData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMorqueDataById = async (req, res) => {
  try {
    const { id } = req.params;
    const morqueData = await morqueDataModel.findById(id);
    if (!morqueData) {
      return res.status(404).json({ message: 'Morque data not found' });
    }
    res.status(200).json(morqueData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMorqueDataByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const morqueData = await morqueDataModel.find({ category: category });
    if (!morqueData) {
      return res.status(404).json({ message: 'Morque data not found' });
    }
    res.status(200).json(morqueData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateMorqueData = async (req, res) => {
  try {
    const { id } = req.params;
    const morqueData = await morqueDataModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!morqueData) {
      return res.status(404).json({ message: 'Morque data not found' });
    }
    res.status(200).json(morqueData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMorqueData = async (req, res) => {
  try {
    const { id } = req.params;
    const morqueData = await morqueDataModel.findByIdAndDelete(id);
    if (!morqueData) {
      return res.status(404).json({ message: 'Morque data not found' });
    }
    res.status(200).json({ message: 'Morque data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
