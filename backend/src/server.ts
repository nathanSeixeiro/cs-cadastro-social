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

export default server;