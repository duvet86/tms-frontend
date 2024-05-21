import type { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/.server/auth";

export async function loader({ request }: LoaderFunctionArgs) {
  return authenticator.authenticate("microsoft", request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
}
