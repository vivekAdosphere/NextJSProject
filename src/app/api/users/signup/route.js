import { NextRequest, NextResponse } from "next/server";

// connect();

export async function POST(request) {
  try {
    console.log("here");
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);
    return NextResponse.json({ message: "Yey", success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
