import * as dotenv from "dotenv";
dotenv.config();
export default {
  url: process.env.MONGO_URL,
};
