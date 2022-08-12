// profile config sourced from grant@5.4.21
// https://github.com/simov/grant/blob/master/config/profile.json
import profileJSON from "./profile.json" assert { type: "json" };

import Providers from "../interfaces/Providers.ts";
import ProfileConfig from "../interfaces/ProfileConfig.ts";

// deno-lint-ignore ban-ts-comment
// @ts-ignore
export default new Map<Providers, ProfileConfig>(Object.entries(profileJSON));
