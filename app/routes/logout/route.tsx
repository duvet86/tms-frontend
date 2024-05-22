import type { LoaderFunctionArgs } from "@remix-run/node";

import { authenticator } from "~/.server/auth";

export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.logout(request, { redirectTo: "/" });
}
