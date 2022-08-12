import OAuthProfile from "./OAuthProfile.ts";

export default interface DiscordProfile extends OAuthProfile {
  username: string;
  avatar: string;
  avatar_decoration: boolean;
  discriminator: string;
  public_flags: number;
  purchased_flags: number;
  premium_usage_flags: number;
  flags: number;
  banner: string;
  banner_color: string;
  accent_color: number;
  bio: string;
  locale: string;
  nsfw_allowed: boolean;
  mfa_enabled: boolean;
  premium_type: number;
  email: string;
  verified: boolean;
  phone: string;
}
