import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticator } from "~/.server/auth";

import { getSession } from "~/.server/session";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("cookie"));

  return json({
    error: session.get(authenticator.sessionErrorKey),
  });
}

export default function Index() {
  const { error } = useLoaderData<typeof loader>();

  return <div>{JSON.stringify(error)}</div>;
}
