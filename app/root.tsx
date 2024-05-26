import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import type { MicrosoftProfile } from "~/.server/auth";

import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  json,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import {
  HomeIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

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
    <html lang="en" data-theme="mytheme" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
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

export function ErrorBoundary() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError();

  return (
    <div className="flex flex-col bg-base-100 h-full p-4 items-center justify-center gap-4">
      {isRouteErrorResponse(error) ? (
        <>
          <h1 className="text-4xl mb-4">{error.statusText}</h1>
          <div className="flex gap-6">
            <Link className="btn btn-primary" to="/">
              <HomeIcon className="w-6 h-6" /> Home
            </Link>
            <Link className="btn btn-neutral" to="/logout">
              <ArrowLeftStartOnRectangleIcon className="w-6 h-6" /> Logout
            </Link>
          </div>
        </>
      ) : (
        <>
          <h1>Error!</h1>
          <p>{error?.message ?? "Unknown error"}</p>
        </>
      )}
    </div>
  );
}
