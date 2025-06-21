/* eslint-disable @typescript-eslint/restrict-template-expressions */
import fs from "fs";
import path from "path";
import App from "./app";
import { configDotenv } from "dotenv";

configDotenv();
const port = parseInt(process.env.PORT || "3000");
const server = new App()
  .Start(port)
  .then((port) => console.log(`Server running on port ${port}`))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

  const uploadDir = path.resolve(process.cwd(), "uploads");

// Verifica se a pasta de uploads existe, caso contrário, cria
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

export default server;
