import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import type { MicrosoftProfile } from "~/.server/auth";

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from "@remix-run/react";

import stylesheet from "~/tailwind.css?url";

import { authenticator } from "~/.server/auth";
import { Sidebar } from "~/components/sidebar/sidebar";
import { Navbar } from "~/components/navbar/navbar";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const meta: MetaFunction = () => {
  return [{ title: "TMS" }, { name: "description", content: "TMS Sadleirs" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const isAuthenticated = await authenticator.isAuthenticated(request);

  if (isAuthenticated) {
    return json({
      user: isAuthenticated.profile,
    });
  }

  return await authenticator.authenticate("microsoft", request);
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="mytheme">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { user } = useLoaderData<{ user: MicrosoftProfile }>();

  return (
    <div className="drawer lg:drawer-open">
      <input id="drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col h-full">
        <Navbar user={user} />
        <main className="bg-base-200 h-full p-4">
          <Outlet />
        </main>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="bg-base-100 flex flex-col h-full">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
