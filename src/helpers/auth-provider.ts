import {
  InteractionRequiredAuthError,
  PublicClientApplication,
} from "@azure/msal-browser";

export class AuthProvider {
  static readonly scopes = ["user.read"];

  static async handlCallback() {
    const clientId = sessionStorage.getItem("loginClientId");
    const tenantId = sessionStorage.getItem("loginTenantId");
    sessionStorage.removeItem("loginClientId");
    sessionStorage.removeItem("loginTenantId");
    const endLocation = sessionStorage.getItem("msal." + clientId + ".request.origin");
    sessionStorage.setItem(`msal.${clientId}.request.origin`, document.location.href.split("#")[0]);
    const authProvider = new AuthProvider(clientId, tenantId);
    const result = await authProvider.handleRedirect(document.location.hash).catch(e => e);
    if (result instanceof Error) {
      alert(result.message);
    } else {
      sessionStorage.setItem(`accessToken.${clientId}`, result.accessToken);
      history.replaceState(null, "", endLocation);
    }
  }

  constructor(
    private clientId: string,
    private tenantId: string,
    private publicClientApplication?: PublicClientApplication,
    private isInitialized?: Promise<void>,
  ) {

    this.isInitialized = new Promise<void>((resolve) => {
      const url = new URL(document.querySelector("base").href, origin).origin;
      this.publicClientApplication = new PublicClientApplication({
        auth: {
          clientId,
          redirectUri: url,
          authority: `https://login.microsoftonline.com/${tenantId}`,
          postLogoutRedirectUri: url,
        },
        cache: {
          cacheLocation: "sessionStorage",
          storeAuthStateInCookie: false,
        },
      });
        this.publicClientApplication.initialize().then(() => {
          resolve();
        });
    });
  }

  async handleRedirect(hash: string) {
    await this.isInitialized;
    return this.publicClientApplication.handleRedirectPromise(hash);
  };

  async getAccount() {
    await this.isInitialized;
    return this.publicClientApplication.getAllAccounts()[0];
  }

  async getAccessToken(): Promise<string> {
    await this.isInitialized;
    const token = sessionStorage.getItem(`accessToken.${this.clientId}`);
    if (token) {
      sessionStorage.removeItem(`accessToken.${this.clientId}`);
      return token;
    }
    const silentResponse = await this.publicClientApplication
      .ssoSilent({scopes: AuthProvider.scopes})
      .catch((error) => error);
    if (silentResponse instanceof Error) {
      if (silentResponse instanceof InteractionRequiredAuthError) {
        sessionStorage.setItem("loginClientId", this.clientId);
        sessionStorage.setItem("loginTenantId", this.tenantId);
        await this.publicClientApplication.loginRedirect({
          scopes: AuthProvider.scopes,
        });
      } else {
        return Promise.reject(silentResponse);
      }
    }
    return silentResponse.accessToken;
  }
}

