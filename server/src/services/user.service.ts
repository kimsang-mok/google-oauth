import axios from "axios";
import qs from "querystring";

interface GoogleTokensResult {
  access_token: string;
  expires_in: Number;
  refresh_token: string;
  scope: string;
  id_token: string;
}

interface GoogleUserResult {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export async function getGoogleOAuthTokens({
  code,
}: {
  code: string;
}): Promise<GoogleTokensResult> {
  const url = "https://oauth2.googleapis.com/token";

  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    grant_type: "authorization_code",
  };

  try {
    const res = await axios.post<GoogleTokensResult>(
      url,
      qs.stringify(values),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return res.data;
  } catch (error: any) {
    console.log("Failed to fetch Google OAuth Token");
    throw new Error(error.message);
  }
}

export async function getGoogleUser(
  access_token: string
): Promise<GoogleUserResult> {
  try {
    const res = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log("Error fetching google user: ", error);
    throw new Error("Error fetching google user");
  }
}
