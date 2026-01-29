import type { AppRouterClient } from "@astro-docs/api/routers/index";

import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { PUBLIC_SERVER_URL } from "astro:env/client";

export const link = new RPCLink({
  url: `${PUBLIC_SERVER_URL}/rpc`,
});

export const orpc: AppRouterClient = createORPCClient(link);
