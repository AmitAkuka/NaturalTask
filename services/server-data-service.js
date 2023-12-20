const csv = require("csvtojson");
const path = require("node:path");
const fs = require("node:fs");
const { CSV_FILE_PATH, FILE_MB_SIZE_LIMIT } = require("../constants");
const { meteorsData } = require("../api/meteor/meteor.service");

const loadInitialMeteorData = async () => {
  try {
    const filePath = path.resolve(__dirname, CSV_FILE_PATH);
    await _validateFileSize(filePath);
    await csv()
      .fromFile(filePath)
      .subscribe(
        (meteorData) =>
          new Promise((resolve, reject) => {
            // Adding only meteors with valid coordinates & nametype 'valid' & fall 'found'.
            const { nametype, fall, reclat, reclong } = meteorData;
            if (
              reclat.length &&
              reclong.length &&
              nametype.toLowerCase() === "valid" &&
              fall.toLowerCase() === "found"
            ) {
              const normalzedMeteorData = _getNormalizedData(meteorData);
              meteorsData.push(normalzedMeteorData);
            }
            resolve();
          })
      );
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const _validateFileSize = async (filePath) => {
  try {
    if (!filePath) throw new Error(`Missing file path!`);
    const stats = await fs.promises.stat(filePath);
    const fileSizeInBytes = stats.size;
    // Converting size to megabytes
    const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
    if (fileSizeInMegabytes > FILE_MB_SIZE_LIMIT)
      throw new Error(`File is over ${FILE_MB_SIZE_LIMIT}MB!`);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const _getNormalizedData = (meteorData) => {
  const { id, name, year, reclat, reclong } = meteorData;
  return {
    id,
    name,
    year,
    coordinates: [parseInt(reclat), parseInt(reclong)],
  };
};

module.exports = {
  loadInitialMeteorData,
};
