import type { LoaderFunctionArgs } from "@remix-run/node";

import { authenticator } from "~/.server/auth";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return await authenticator.authenticate("microsoft", request, {
    successRedirect: "/",
    failureRedirect: "/auth/error",
  });
};
