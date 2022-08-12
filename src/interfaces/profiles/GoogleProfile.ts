import OAuthProfile from "./OAuthProfile.ts";

export default interface GoogleProfile extends OAuthProfile {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}
