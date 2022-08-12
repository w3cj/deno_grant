import StrategyConfig from "@/interfaces/StrategyConfig.ts";

export default interface DenoGrantConfig {
  /**
   * The base uri to use for all redirect_paths specified in each strategy
   *
   * @type {string}
   * @memberof DenoGrantConfig
   */
  base_uri?: string;

  /**
   * A list of strategies to initialize.
   *
   * @type {StrategyConfig[]}
   * @memberof DenoGrantConfig
   */
  strategies?: StrategyConfig[];
}
