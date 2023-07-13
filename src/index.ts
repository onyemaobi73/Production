// import { error, log } from "console";
import express, { Application, Request, Response } from "express";
import { mainApp } from "./mainApp";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { dbConnect } from "./config/db";

const realport = parseInt(process.env.APPLICATION_PORT!);
const port: number = realport;

const app: Application = express();
mainApp(app);

const server = app.listen(process.env.APPLICATION_PORT||port, () => {
  console.log("");
  dbConnect()
  console.log("server is now live");
});

process.on("uncaughtException", (error: any) => {
  console.log("server is shutting down due to : uncaughtException");
  console.log(error);
  process.exit(1);
});
process.on("unhandledRejection", (reason: any) => {
  console.log("serveris shutting down due to: unhandledRejection");

  console.log(reason);

  server.close(() => {
    process.exit(1);
  });
});
