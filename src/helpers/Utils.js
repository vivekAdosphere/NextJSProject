/* eslint-disable import/no-anonymous-default-export */
import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import serverConfig from "@/configs/serverConfig";

export default {
  loadJSON: (path) =>
    JSON.parse(fs.readFileSync(new URL(path, import.meta.url))),
  hashPassword: async (password) => {
    try {
      return await bcrypt.hash(password, 10);
    } catch (err) {
      throw err;
    }
  },
  comparePassword: async (enteredPassword, savedPassword) => {
    try {
      return await bcrypt.compare(enteredPassword, savedPassword);
    } catch (err) {
      throw err;
    }
  },
  getCookieConfiguration: (seconds) => {
    const expiresAt = new Date();
    expiresAt.setTime(expiresAt.getTime() + seconds * 1000);
    const config = {
      path: "/",
      expires: expiresAt,
      httpOnly: true,
      sameSite: !serverConfig.DEBUG ? "none" : "lax",
      secure: !serverConfig.DEBUG,
    };
    return config;
  },
  signJWT: (payload, expiry, secret) =>
    jwt.sign(payload, secret, { expiresIn: expiry }),
  verifyJWT: (token, secret) => jwt.verify(token, secret),
};
