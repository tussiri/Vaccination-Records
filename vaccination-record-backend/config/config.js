import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://tussiri:ookkfaHIkZQvDphu@portfoliocluster.qtrd7qh.mongodb.net/?retryWrites=true&w=majority";
const JWT_SECRET = process.env.JWT_SECRET || "test-test";
export const PORT = process.env.PORT || 5001;

export { MONGODB_URI, JWT_SECRET };
