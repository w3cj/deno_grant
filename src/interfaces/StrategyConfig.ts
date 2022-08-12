import { z } from "zod";

import Providers from "./Providers.ts";

const StrategyConfig = z.object({
  provider: z.nativeEnum(Providers).optional(),
  client_id: z.string(),
  client_secret: z.string(),
  redirect_uri: z.string().optional(),
  redirect_path: z.string().optional(),
  scope: z.string().or(z.array(z.string())).optional(),
  profile_url: z.string().optional(),
  state_validator: z.function()
    .args(z.string().or(z.null()))
    .returns(z.boolean())
    .optional(),
});

type StrategyConfig = z.infer<typeof StrategyConfig>;

export default StrategyConfig;
