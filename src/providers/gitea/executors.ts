import type { CredentialValidators } from "../../core/types.ts";

import { validateGiteaCredential } from "./runtime.ts";

export { executors } from "./runtime.ts";

export const credentialValidators: CredentialValidators = {
  async apiKey(input, { fetcher, signal }) {
    return validateGiteaCredential(input, fetcher, signal);
  },
};
