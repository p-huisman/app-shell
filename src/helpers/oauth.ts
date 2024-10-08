import * as oauth from "oauth4webapi";

const issuer = new URL("https://demo.duendesoftware.com/");
const client_id = "interactive.public.short";
const client_secret = "secret";
const code_challenge_method = "S256";
let authServer: oauth.AuthorizationServer;
const state = "{}";

export const authenticate = async () => {
  const baseUrl = new URL(document.querySelector("base").href || "/");

  const currentUrl = new URL(window.location.href);
  if (!authServer) {
    authServer = await oauth
      .discoveryRequest(issuer)
      .then((response) => oauth.processDiscoveryResponse(issuer, response));
  }
  const token = sessionStorage.getItem("token");
  if (token && currentUrl.pathname !== "/oauth/logout") {
    history.replaceState(null, "", "/");
    return;
  }

  const client: oauth.Client = {client_id};
  const redirect_uri = baseUrl + "oauth/callback";

  if (currentUrl.pathname === baseUrl.pathname + "oauth/callback") {
    const params = oauth.validateAuthResponse(
      authServer,
      client,
      currentUrl,
      state,
    );
    let clientAuth = oauth.ClientSecretPost(client_secret);
    const code_verifier = sessionStorage.getItem("code_verifier");
    sessionStorage.removeItem("code_verifier");
    const response = await oauth.authorizationCodeGrantRequest(
      authServer,
      client,
      clientAuth,
      params,
      redirect_uri,
      code_verifier,
    );
    const token = await response.json().catch((e) => e);
    if (!response.ok || token instanceof Error) {
      console.error(token.error);
    } else {
      sessionStorage.setItem("token", JSON.stringify(token));
    }
    history.replaceState(null, "", baseUrl.toString());
  } else if (currentUrl.pathname === baseUrl.pathname + "oauth/logout") {
    // end session
    const token = JSON.parse(sessionStorage.getItem("token")!);
    const endSessionUrl = new URL(authServer.end_session_endpoint);
    sessionStorage.removeItem("token");
    const params = encodedStringFromObject(
      {
        id_token_hint: token.id_token,
        post_logout_redirect_uri: baseUrl.toString(),
      },
      encodeURIComponent,
      "&",
    );

    document.location.href = endSessionUrl.toString() + "?" + params;
  } else {
    // authorize
    const code_verifier = oauth.generateRandomCodeVerifier();
    sessionStorage.setItem("code_verifier", code_verifier);
    const code_challenge =
      await oauth.calculatePKCECodeChallenge(code_verifier);
    const authorizationUrl = new URL(authServer.authorization_endpoint!);
    authorizationUrl.searchParams.set("client_id", client.client_id);
    authorizationUrl.searchParams.set("redirect_uri", redirect_uri);
    authorizationUrl.searchParams.set("state", state);
    authorizationUrl.searchParams.set("response_type", "code");
    authorizationUrl.searchParams.set(
      "scope",
      "openid email profile offline_access",
    );
    authorizationUrl.searchParams.set("code_challenge", code_challenge);
    authorizationUrl.searchParams.set(
      "code_challenge_method",
      code_challenge_method,
    );
    document.location.href = authorizationUrl.toString();
  }
};

export function encodedStringFromObject(
  o: any,
  encoding: (arg0: string) => string = encodeURIComponent,
  seperator = "&",
) {
  return Object.keys(o)
    .map((key) => {
      return `${key}=${encoding(o[key])}`;
    })
    .join(seperator);
}
