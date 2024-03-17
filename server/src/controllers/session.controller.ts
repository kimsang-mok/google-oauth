import { Request, Response, NextFunction } from "express";
import { getGoogleOAuthTokens, getGoogleUser } from "../services/user.service";
import jwt from "jsonwebtoken";

export async function googleOauthHandler(req: Request, res: Response) {
  try {
    // get the code from query string
    const code = req.query.code as string;

    // get the id and access token with the code
    const { id_token, access_token } = await getGoogleOAuthTokens({ code });

    // get users with token
    // const googleUser = jwt.decode(id_token);
    const googleUser = await getGoogleUser(access_token);
    console.log(googleUser);

    res.redirect(`${process.env.CLIENT_REDIRECT_URL}?login=success`);

    // create the user
    // create a session
    // create access and refresh token
    // set cookies
    // redirect back to client
  } catch (error) {
    console.log("Failed to authorize Google user");
    res.redirect(`${process.env.CLIENT_REDIRECT_URL}?login=failed`);
  }
}
