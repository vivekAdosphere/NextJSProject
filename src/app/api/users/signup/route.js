import respnonseConstant from "@/constants/respnonseConstant";
import { connectDB, createUser, getUser } from "@/services/databaseService";
import HttpError from "@/utils/HttpError";
import Helpers from "@/helpers/Utils";
import { NextResponse } from "next/server";

connectDB();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    let { username, email, password } = reqBody;

    if (!username && !email && !password) {
      return NextResponse.json(
        HttpError(
          new Error("Please provide username,email and password!"),
          request,
          400
        )
      );
    }

    // check for existing user
    const isUserInDb = await getUser({ email: email });

    if (isUserInDb) {
      return NextResponse.json(
        HttpError(new Error(respnonseConstant.ALREADY_EXIST), request, 403)
      );
    }

    const hashedPassword = await Helpers.hashPassword(password);
    reqBody.password = hashedPassword;

    console.log(reqBody);

    // creating user in database
    const newUser = await createUser(reqBody);

    return NextResponse.json({ message: "Yey", success: true });
  } catch (error) {
    return NextResponse.json(HttpError(error, request, 500));
  }
}
