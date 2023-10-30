import express from "express";

import sequelize from "./db";

const app = express();

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () =>
      // eslint-disable-next-line no-console
      console.log(`Server has started on PORT ${PORT} 🚀🚀🚀`),
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

start();
