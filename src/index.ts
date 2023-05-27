import {
  GetTokenOptions,
  OAuth2Client,
} from "https://deno.land/x/oauth2_client@v0.2.1/mod.ts";

import OAuthConfigs from "./config/OAuthConfigs.ts";
import ProfileConfigs from "./config/ProfileConfigs.ts";

import DenoGrantConfig from "./interfaces/DenoGrantConfig.ts";
import Providers from "./interfaces/Providers.ts";
import StrategyConfig from "./interfaces/StrategyConfig.ts";
import {
  ProfileRequestOverrides,
  ProfileResponseTransforms,
  TokenRequestOverrides,
} from "./overrides.ts";
import ProfileType from "./interfaces/ProfileType.ts";

export interface ProfileRequestOptions {
  headers?: Record<string, string>;
  urlParams?: Record<string, string>;
}

export default class DenoGrant {
  config: DenoGrantConfig;
  strategies = new Map<Providers, OAuth2Client>();

  constructor(config: DenoGrantConfig) {
    this.config = config;
    if (config.strategies) {
      config.strategies.forEach((strategyConfig) => {
        if (!strategyConfig.provider) {
          throw new Error(
            "DenoGrant: Missing provider name for strategy specified in constructor",
          );
        } else {
          this.addStrategy(strategyConfig.provider, strategyConfig);
        }
      });
    }
  }

  addStrategy(
    providerName: Providers,
    strategyConfig: StrategyConfig,
  ): OAuth2Client {
    const providerOAuthConfig = OAuthConfigs.get(providerName);
    if (!providerOAuthConfig) {
      throw new Error("Missing OAuth config for:" + providerName);
    }
    // TODO: handle extra / trailing path slash
    const redirectUri = strategyConfig.redirect_uri ||
      `${this.config.base_uri}${strategyConfig.redirect_path}`;
    const client = new OAuth2Client({
      clientId: strategyConfig.client_id,
      clientSecret: strategyConfig.client_secret,
      authorizationEndpointUri: providerOAuthConfig.authorize_url,
      tokenUri: providerOAuthConfig.access_url,
      redirectUri,
      defaults: {
        scope: strategyConfig.scope,
        stateValidator: strategyConfig.state_validator,
      },
    });
    this.strategies.set(
      providerName,
      client,
    );

    return client;
  }

  getAuthorizationUri(providerName: Providers) {
    const strategy = this.strategies.get(providerName);
    return strategy?.code.getAuthorizationUri();
  }

  getToken(
    providerName: Providers,
    authResponseUri: string | URL,
    options?: GetTokenOptions,
  ) {
    const strategy = this.strategies.get(providerName);
    const overrideFn = TokenRequestOverrides.get(providerName);
    let overrideOptions = options;
    if (overrideFn && !overrideOptions && strategy) {
      overrideOptions = overrideFn(strategy);
    }
    return strategy?.code.getToken(authResponseUri, options || overrideOptions);
  }

  async getProfile<T extends Providers>(
    providerName: T,
    accessToken: string,
    options?: ProfileRequestOptions,
  ): Promise<ProfileType<T>> {
    const providerProfile = ProfileConfigs.get(providerName);
    if (providerProfile && providerProfile.profile_url) {
      const strategy = this.strategies.get(providerName);
      const overrideFn = ProfileRequestOverrides.get(providerName);
      let overrideOptions = options;
      if (overrideFn && !overrideOptions && strategy) {
        overrideOptions = overrideFn(strategy);
      } else {
        overrideOptions = {};
      }
      const urlParams = new URLSearchParams(overrideOptions.urlParams);
      const url = `${providerProfile.profile_url}${urlParams.toString()}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...(overrideOptions.headers || {}),
        },
      });
      // TODO: handle response error
      const json = await response.json();
      const responseTransformer = ProfileResponseTransforms.get(providerName);
      if (responseTransformer) {
        return responseTransformer(json) as ProfileType<T>;
      }
      return json;
    } else {
      throw new Error("Missing profile_url for: " + providerName);
    }
  }
}
