import express from "express";

import { configs } from "./config";
import { cronRunner } from "./crons";
import sequelize from "./db";
import { authRouter, commentRouter } from "./routers";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));
app.use("/comments", commentRouter);

app.use("/auth", authRouter);
app.use("/users", userRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(configs.PORT, () =>
      // eslint-disable-next-line no-console
      console.log(`Server has started on PORT ${configs.PORT} 🚀🚀🚀`),
    );
    cronRunner();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

start();
