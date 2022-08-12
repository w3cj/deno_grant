// oauth config sourced from grant@5.4.21
// filtered where oauth === 2
// https://github.com/simov/grant/blob/master/config/oauth.json
import oauthJSON from "./oauth.json" assert { type: "json" };

import Providers from "../interfaces/Providers.ts";
import OAuthConfig from "../interfaces/OAuthConfig.ts";

// deno-lint-ignore ban-ts-comment
// @ts-ignore
export default new Map<Providers, OAuthConfig>(Object.entries(oauthJSON));
