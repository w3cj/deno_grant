import OAuthProfile from "./OAuthProfile.ts";

export interface TwitchProfileResponse {
  data: [TwitchProfile];
}

export default interface TwitchProfile extends OAuthProfile {
  login: string;
  display_name: string;
  type: string;
  broadcaster_type: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  email: string;
  created_at: string;
}
