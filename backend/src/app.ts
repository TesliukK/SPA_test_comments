import express from "express";

import { configs } from "./config";
import sequelize from "./db";
import { commentRouter } from "./routers";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/comments", commentRouter);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(configs.PORT, () =>
      // eslint-disable-next-line no-console
      console.log(`Server has started on PORT ${configs.PORT} 🚀🚀🚀`),
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

start();
