import { GetTokenOptions, OAuth2Client } from "https://deno.land/x/oauth2_client@v0.2.1/mod.ts";
import { ProfileRequestOptions } from "./index.ts";
import GithubProfile from "./interfaces/profiles/GithubProfile.ts";
import OAuthProfile from "./interfaces/profiles/OAuthProfile.ts";
import { TwitchProfileResponse } from "./interfaces/profiles/TwitchProfile.ts";
import Providers from "./interfaces/Providers.ts";

export const TokenRequestOverrides = new Map<
  Providers,
  (client: OAuth2Client) => GetTokenOptions
>();
export const ProfileRequestOverrides = new Map<
  Providers,
  (client: OAuth2Client) => ProfileRequestOptions
>();
export const ProfileResponseTransforms = new Map<
  Providers,
  // deno-lint-ignore no-explicit-any
  (profileResponse: any) => OAuthProfile
>();

TokenRequestOverrides.set(Providers.twitch, (client: OAuth2Client) => {
  return {
    requestOptions: {
      body: {
        // twitch doesn't seem to support RFC6749..., so add the client_id and client_secret to the body
        client_id: client.config.clientId || "",
        client_secret: client.config.clientSecret || "",
      },
    },
  };
});

// TODO: handle custom profile request
// https://github.com/simov/grant/blob/master/lib/profile.js#L74
ProfileRequestOverrides.set(Providers.twitch, (client: OAuth2Client) => {
  return {
    headers: {
      // twitch requires client-id in the headers
      "client-id": client.config.clientId,
    },
  };
});

// Twitch profile request responds with a "data" wrapper, we unwrap it here
ProfileResponseTransforms.set(
  Providers.twitch,
  (profileResponse: TwitchProfileResponse) => {
    return profileResponse.data[0];
  },
);

ProfileResponseTransforms.set(
  Providers.github,
  (profileResponse: GithubProfile) => {
    profileResponse.id = profileResponse.id.toString();
    return profileResponse;
  },
);
