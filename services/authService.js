import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authRepository from "../repositories/authRepository.js";
import sendVerificationEmail from "../utils/emailService.js";
import dotenv from "dotenv";

dotenv.config();

const register = async (userData) => {
  const { first_name, last_name, email, password, role } = userData;

  if (!["customer", "admin"].includes(role)) {
    throw new Error("Invalid role");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await authRepository.createUser(first_name, last_name, email, hashedPassword, role);

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
  const verificationLink = `http://localhost:5000/api/auth/verify/${token}`;

  await sendVerificationEmail(email, verificationLink);

  return { message: "✅ Registration successful. Check email for verification." };
};

const login = async ({ email, password }) => {
  const user = await authRepository.getUserByEmail(email);
  if (!user) throw new Error("User not found");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
  return { token };
};

const verifyEmail = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const result = await authRepository.verifyUser(decoded.email);
  return result ? { message: "✅ Email verified successfully!" } : { message: "Verification failed" };
};

export default { register, login, verifyEmail };
