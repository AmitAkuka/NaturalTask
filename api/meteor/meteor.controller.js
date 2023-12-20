const meteorService = require("./meteor.service");

const getMeteors = async (req, res) => {
  try {
    const meteorsData = await meteorService.query();
    res.status(200).send(meteorsData);
  } catch (err) {
    res.status(500).send(err.message || err);
  }
};

const getMeteorById = async (req, res) => {
  try {
    const { id } = req.params;
    const meteorData = await meteorService.query(id);
    res.status(200).send(meteorData);
  } catch (err) {
    res.status(500).send(err.message || err);
  }
};

const deleteMeteorById = async (req, res) => {
  try {
    const { id } = req.params;
    await meteorService.deleteById(id);
    res.status(200).send({ msg: "Successfuly deleted meteor!" });
  } catch (err) {
    res.status(500).send(err.message || err);
  }
};

module.exports = {
  getMeteors,
  getMeteorById,
  deleteMeteorById,
};
