function getGoogleOAuthUrl() {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  const options = {
    redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URL,
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  console.log({ options });

  const qs = new URLSearchParams(options);

  console.log({ qs }.toString());

  return `${rootUrl}?${qs.toString()}`;
}

export const handleGoogleLogin = () => {
  const googleOAuthUrl = getGoogleOAuthUrl();
  const width = 800,
    height = 600;
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;

  const authWindow = window.open(
    googleOAuthUrl,
    "GoogleAuthPopup",
    `toolbar=no, location=no, directories=no, status=no, menubar=no, 
    scrollbars=yes, resizable=yes, copyhistory=no, width=${width}, 
    height=${height}, top=${top}, left=${left}`
  );

  // detect when the pop-up is closed to handle post-authentication logic
  if (authWindow) {
    const interval = setInterval(() => {
      try {
        // check if the pop-up window's URL is the redirect URL with the success query
        const popupUrl = new URL(authWindow.location.href);
        const loginStatus = popupUrl.searchParams.get("login");
        if (loginStatus === "success") {
          clearInterval(interval);
          authWindow.close();
        }
      } catch (error) {
        console.error("Login failed.");
      }
      if (authWindow.closed) {
        clearInterval(interval);
      }
    }, 1000);
  } else {
    console.error("Unable to open the Google authentication window.");
  }
};
