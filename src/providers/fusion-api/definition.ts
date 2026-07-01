import type { ProviderDefinition } from "../../core/types.ts";

import { fusionApiActions } from "./actions.ts";

const service = "fusion-api";

/**
 * OOMOL Fusion API catalog provider.
 *
 * The private source runtime requires an OOMOL-issued request token and an
 * operator-configured Fusion API base URL. The open-source runtime has no local
 * credential source for that token, so the public provider exposes catalog
 * metadata without runnable local executors.
 */
export const provider: ProviderDefinition = {
  service,
  displayName: "OOMOL Fusion API",
  categories: ["AI", "Developer Tools"],
  authTypes: ["no_auth"],
  auth: [{ type: "no_auth" }],
  homepageUrl: "https://www.oomol.com",
  actions: fusionApiActions,
};
