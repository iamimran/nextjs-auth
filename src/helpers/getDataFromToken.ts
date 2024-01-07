import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const encodedToken = request.cookies.get("token")?.value || "";
    const decodedToken: any = jwt.verify(
      encodedToken,
      process.env.TOKEN_SECRET!
    );
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
