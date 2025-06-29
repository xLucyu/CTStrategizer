import dotenv from "dotenv";

dotenv.config();

const { TOKEN, ID } = process.env;

if (!TOKEN || !ID) throw new Error;

export const config = {
  TOKEN,
  ID
}
