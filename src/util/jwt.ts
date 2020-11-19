import * as dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
//const SUPER_SECRET_KEY = process.env.SECRET_KEY;
const SECRET_KEY = "THIS IS A SUPER  SECRET KEY";
export const createJWT = async (encodedData: {
  email: String;
  role: String;
  branch: String;
}) => {
  if (!SECRET_KEY) return new Error("NOT SECRET KEY FOUND");
  const token = await jwt.sign(encodedData, SECRET_KEY, {
    expiresIn: "1h",
  });
  return {
    token,
    email: encodedData.email,
    role: encodedData.role,
    branch: encodedData.branch,
    expiresIn: 3600,
  };
};

export const compareJWT = async () => {};
