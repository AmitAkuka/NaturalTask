const express = require("express");
const app = express();
const { loadInitialMeteorData } = require("./services/server-data-service");
const PORT = process.env.PORT || 3030;
const meteorRoutes = require("./api/meteor/meteor.routes");

app.use(express.json());

app.use("/api/meteorData", meteorRoutes);

const startServer = async () => {
  try {
    await loadInitialMeteorData();
    console.log("Loaded meteor data successfuly!");
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();
