import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

import { Form, json, useLoaderData } from "@remix-run/react";

import { authenticator } from "~/.server/auth";

export async function loader({ request }: LoaderFunctionArgs) {
  const isAuthenticated = await authenticator.isAuthenticated(request);

  console.log("______________isAuthenticated", isAuthenticated);

  return json({
    isAuthenticated,
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const user = await authenticator.authenticate("microsoft", request);

  console.log("______________user", user);
}

export default function Index() {
  const { isAuthenticated } = useLoaderData<typeof loader>();

  return (
    <>
      {isAuthenticated ? (
        <div>Authenticated</div>
      ) : (
        <Form method="post">
          <button className="btn">Login with Microsoft</button>
        </Form>
      )}
    </>
  );
}
