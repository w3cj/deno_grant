# DenoGrant

Minimalistic pre-configured OAuth 2.0 client for Deno. Inspired by
[Grant](https://github.com/simov/grant).

> NOTE: this is alpha software subject to breaking changes at anytime

- Comes pre-configured for the following Providers:
  - [Discord](https://discord.com/developers/docs/intro) |
    [Github](https://docs.github.com/developers) |
    [Google](https://developers.google.com/) | [Twitch](https://dev.twitch.tv/)
  - More coming soon!
- Built in Typescript definitions for Profile API responses
- Uses [deno-oauth2-client](https://github.com/cmd-johnson/deno-oauth2-client)
  internally
  - can be used with _any_ Deno library
  - only implements OAuth 2.0 grants, letting you take care of storing and
    retrieving sessions, managing state parameters, etc.

## Usage

```ts
import DenoGrant, {
  OAuth2Client,
  Providers,
} from "https://deno.land/x/deno_grant@v0.1.0/mod.ts";

// Create a DenoGrant instance with your app's base uri and any number of strategies:
const denoGrant = new DenoGrant({
  base_uri: "http://localhost:8000",
  strategies: [{
    provider: Providers.discord,
    client_id: "<your client id>",
    client_secret: "<your client secret>",
    redirect_path: "/auth/discord/callback",
    scope: "identify",
  }, {
    provider: Providers.google,
    client_id: "<your client id>",
    client_secret: "<your client secret>",
    redirect_path: "/auth/google/callback",
    scope: "openid profile",
  }],
});

// You can also add strategies after creation:
const githubStrategy: OAuth2Client = denoGrant.addStrategy(Providers.github, {
  client_id: "<your client id>",
  client_secret: "<your client secret>",
  redirect_path: "/auth/github/callback",
  scope: "",
});

// Generate an authorization URI for a registered strategy:
const discordAuthorizationURI = denoGrant.getAuthorizationUri(Providers.discord)
  .toString();
const googleAuthorizationURI = denoGrant.getAuthorizationUri(Providers.google)
  .toString();
const githubAuthorizationURI = denoGrant.getAuthorizationUri(Providers.github)
  .toString();

// Redirect user to authorization URI...

// User gets redirected back to your app,
// Generate access tokens
const tokens = await denoGrant.getToken(
  Providers.github,
  "http://localhost:8000/auth/github/callback?code=abc123&scope=",
);

// Request user profile with obtained access token
const profile = await denoGrant.getProfile(
  Providers.github,
  tokens.accessToken,
);
// Profile is fully typed based on provider type!
```
