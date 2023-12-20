const meteorsData = [];

const query = async (meteorId) => {
  try {
    if (!meteorsData.length) throw new Error("No meteors data found!");
    return await new Promise((resolve, reject) => {
      //Simulate a server request...
      setTimeout(() => {
        if (meteorId) {
          const meteorData = meteorsData.find((m) => m.id === meteorId);
          if (!meteorData)
            reject(new Error(`Failed to find meteor with id ${meteorId}`));
          resolve(meteorData);
        }
        resolve(meteorsData);
      }, 1000);
    });
  } catch (err) {
    throw err;
  }
};

const deleteById = async (meteorId) => {
  try {
    return await new Promise((resolve, reject) => {
      //Simulate a server request...
      setTimeout(() => {
        const meteorIdx = meteorsData.findIndex((m) => m.id === meteorId);
        if (meteorIdx < 0)
          reject(new Error(`Failed to find meteor with id ${meteorId}`));
        meteorsData.splice(meteorIdx, 1);
        resolve();
      }, 1000);
    });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  query,
  deleteById,
  meteorsData,
};
