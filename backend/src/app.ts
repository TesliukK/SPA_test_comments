import express, { Application } from "express";
import * as http from "http";
import { Server, Socket } from "socket.io";
import * as swaggetUi from "swagger-ui-express";

import { configs } from "./config";
import { cronRunner } from "./crons";
import sequelize from "./db";
import { authRouter, commentRouter } from "./routers";
import { userRouter } from "./routers/user.router";
import * as swaggerJson from "./utils/swagger.json";

const app: Application = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket: Socket) => {
  socket.on("newComment", (comment) => {
    console.log("New comment:", comment);
    // Відправка події всім підключеним користувачам
    io.emit("newCommentNotification", comment);
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));
app.use("/comments", commentRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/docs", swaggetUi.serve, swaggetUi.setup(swaggerJson));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    server.listen(configs.PORT, () =>
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
