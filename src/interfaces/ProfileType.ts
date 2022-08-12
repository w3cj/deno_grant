import Providers from "./Providers.ts";
import OAuthProfile from "./profiles/OAuthProfile.ts";
import DiscordProfile from "./profiles/DiscordProfile.ts";
import GithubProfile from "./profiles/GithubProfile.ts";
import GoogleProfile from "./profiles/GoogleProfile.ts";
import TwitchProfile from "./profiles/TwitchProfile.ts";

type ProfileType<T> = T extends Providers.discord ? DiscordProfile
  : T extends Providers.github ? GithubProfile
  : T extends Providers.google ? GoogleProfile
  : T extends Providers.twitch ? TwitchProfile
  : OAuthProfile;

export default ProfileType;
