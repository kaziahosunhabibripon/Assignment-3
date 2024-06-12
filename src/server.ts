import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
import { Server } from "http";
let server: Server;
async function main() {
  try {
    await mongoose.connect(config.db as string);
    console.log("Database connected successfully !");

    app.listen(config.port, () => {
      console.log(
        `Server is connected on port http://localhost:${config.port}`
      );
    });
  } catch (err: any) {
    console.error("Failed to connect to the database:", err);
    process.exit(1);
  }
}

main();
process.on("uncaughtException", () => {
  console.log(`😈 unhandledRejection is detected, server is shutting down`);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
process.on("uncaughtException", () => {
  console.log(`🚫 uncaughtException is detected, server is shutting down`);

  process.exit(1);
});
