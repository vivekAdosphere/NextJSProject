import mongoose from "mongoose";
import dbConfig from "@/configs/dbConfig";
import userModel from "@/models/userModel";
const { DATABASE_URL } = dbConfig;

export async function connect() {
  try {
    mongoose.connect(DATABASE_URL);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log(`Database connected successfully`);
    });

    connection.on("error", (err) => {
      console.log(
        `MongoDB connection error.Please make sure MongoDB is running. ` + err
      );
    });
    // process.exit();
  } catch (err) {
    throw err;
  }
}

// user related services

export const createUser = async (payload) => {
  try {
    const user = await userModel.create(payload);
    return user;
  } catch (err) {
    Logger.info(
      `Failed to create user --> ${err.response?.data?.message || err.message}`
    );
    throw err;
  }
};

export const getUser = async (filter = {}, select = ``) => {
  try {
    const user = await userModel.findOne(filter).select(select);
    return user;
  } catch (err) {
    Logger.err(
      `Failed to get user --> ${err.response?.data?.message || err.message}`
    );
    throw err;
  }
};

export const getAllUsers = async () => {
  try {
    const users = await userModel.find();
    return users;
  } catch (err) {
    Logger.err(
      `Failed to get user --> ${err.response?.data?.message || err.message}`
    );
    throw err;
  }
};

export const removeUser = async (keyObject) => {
  try {
    const user = await userModel.findOneAndRemove(keyObject);
    return user;
  } catch (err) {
    Logger.err(
      `Failed to remove user --> ${err.response?.data?.message || err.message}`
    );
    throw err;
  }
};
