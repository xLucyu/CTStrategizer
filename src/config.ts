import dotenv from "dotenv";

dotenv.config();

const { TOKEN, ID } = process.env;

export const config = {
  TOKEN,
  ID
}
