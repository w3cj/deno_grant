import OAuthProfile from "./OAuthProfile.ts";

export interface FitbitProfileResponse {
  user: FitbitProfile;
}

export default interface FitbitProfile extends OAuthProfile {
  age: number;
  ambassador: boolean;
  autoStrideEnabled: boolean;
  avatar: string;
  avatar150: string;
  avatar640: string;
  averageDailySteps: number;
  challengesBeta: boolean;
  clockTimeDisplayFormat: "12hour" | "24hour";
  corporate: boolean;
  corporateAdmin: boolean;
  dateOfBirth: string;
  displayName: string;
  displayNameSetting: "name" | "username";
  distanceUnit: string;
  encodedId: string;
  features: {
    exerciseGoal: boolean;
    phoneNumberFriendFinding: {
      algorithm: string;
      countries: string[];
      salt: string[];
    };
  };
  firstName: string;
  foodsLocale: string;
  fullName: string;
  gender: "MALE" | "FEMALE" | "NA";
  glucoseUnit: string;
  height: number;
  heightUnit: string;
  isBugReportEnabled: boolean;
  isChild: boolean;
  isCoach: boolean;
  languageLocale: string;
  lastName: string;
  legalTermsAcceptRequired: boolean;
  locale: string;
  memberSince: string;
  mfaEnabled: boolean;
  offsetFromUTCMillis: number;
  sdkDeveloper: boolean;
  sleepTracking: "Normal" | "Sensitive";
  startDayOfWeek: "SUNDAY" | "MONDAY";
  strideLengthRunning: number;
  strideLengthRunningType: "auto" | "default" | "manual";
  strideLengthWalking: number;
  strideLengthWalkingType: "auto" | "default" | "manual";
  swimUnit: string;
  timezone: string;
  topBadges: Badge[];
  visibleUser: boolean;
  waterUnit: string;
  waterUnitName: string;
  weight: number;
  weightUnit: string;
}

export interface Badge {
  badgeGradientEndColor: string;
  badgeGradientStartColor: string;
  badgeType: string;
  category: string;
  cheers: Array<Record<string, unknown>>;
  dateTime: string;
  description: string;
  earnedMessage: string;
  encodedId: string;
  image100px: string;
  image125px: string;
  image300px: string;
  image50px: string;
  image75px: string;
  marketingDescription: string;
  mobileDescription: string;
  name: string;
  shareImage640px: string;
  shareText: string;
  shortDescription: string;
  shortName: string;
  timesAchieved: number;
  unit: string;
  value: number;
}
