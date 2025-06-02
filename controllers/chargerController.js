const ChargingStation = require('../Models/ChargingStation');

const createCharger = async (req, res) => {
  const { name, location, status, powerOutput, connectorType } = req.body;
  console.log(req.body,'req.body');
  try {
    const newCharger = new ChargingStation({
      name,
      location,
      status,
      powerOutput,
      connectorType,
      createdBy: req.user.userId,
    });
     console.log(newCharger,'newCharger');
    await newCharger.save();
    res.status(201).json(newCharger);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create charger' });
  }
};

const getAllChargers = async (req, res) => {
  try {
    const chargers = await ChargingStation.find({ createdBy: req.user.userId });
    res.status(200).json(chargers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch chargers' });
  }
};

const updateCharger = async (req, res) => {
  const { id } = req.params;
  const { name, location, status, powerOutput, connectorType } = req.body;

  try {
    const updated = await ChargingStation.findByIdAndUpdate(
      id,
      { name, location, status, powerOutput, connectorType },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update charger' });
  }
};

const deleteCharger = async (req, res) => {
  const { id } = req.params;

  try {
    await ChargingStation.findByIdAndDelete(id);
    res.status(200).json({ message: 'Charger deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete charger' });
  }
};

module.exports = {
  createCharger,
  getAllChargers,
  updateCharger,
  deleteCharger,
};
