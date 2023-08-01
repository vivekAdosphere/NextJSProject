import respnonseConstant from "@/constants/respnonseConstant";
import { connectDB, getUser } from "@/services/databaseService";
import HttpError from "@/utils/HttpError";
import Helpers from "@/helpers/Utils";
import { NextResponse } from "next/server";
import serverConfig from "@/configs/serverConfig";
import HttpResponse from "@/utils/HttpResponse";
import successMessageConstant from "@/constants/successMessageConstant";

connectDB();

export async function POST(request) {
  try {
    console.log("here");
    const reqBody = await request.json();
    console.log(reqBody);
    let { email, password } = reqBody;

    if (!email && !password) {
      return NextResponse.json(
        HttpError(new Error("Please provide email and password!"), request, 400)
      );
    }

    // check for existing user
    const isUserInDb = await getUser({ email: email }, "+password");

    if (!isUserInDb) {
      return NextResponse.json(
        HttpError(new Error(respnonseConstant.NOT_FOUND), request, 403)
      );
    }

    console.log(isUserInDb);
    const matchPassword = await Helpers.comparePassword(
      password,
      isUserInDb.password
    );

    if (!matchPassword) {
      return NextResponse.json(
        HttpError(new Error("Please enter valid password!"), request, 401)
      );
    }

    const jwtPayload = { id: isUserInDb.id };

    const accessToken = Helpers.signJWT(
      jwtPayload,
      serverConfig.ACCESS_TOKEN.EXPIRY,
      serverConfig.ACCESS_TOKEN.SECRET
    );
    const refreshToken = Helpers.signJWT(
      jwtPayload,
      serverConfig.REFRESH_TOKEN.EXPIRY,
      serverConfig.REFRESH_TOKEN.SECRET
    );

    const cookieConfig = Helpers.getCookieConfiguration(
      serverConfig.ACCESS_TOKEN.EXPIRY
    );

    const response = NextResponse.json(
      HttpResponse(
        request,
        200,
        { accessToken, refreshToken },
        successMessageConstant.USER.LOGIN
      )
    );
    response.cookies.set("token", accessToken, cookieConfig);
    return response;
  } catch (error) {
    return NextResponse.json(HttpError(error, request, 500));
  }
}
