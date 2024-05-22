import type { LoaderFunctionArgs } from "@remix-run/node";

import { authenticator } from "~/.server/auth";
import { Navbar } from "~/components/navbar/navbar";
import { Sidebar } from "~/components/sidebar/sidebar";

export async function loader({ request }: LoaderFunctionArgs) {
  const isAuthenticated = await authenticator.isAuthenticated(request);

  if (isAuthenticated) {
    return null;
  }

  return await authenticator.authenticate("microsoft", request);
}

export default function Index() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col h-full">
        {/* Page content here */}
        <Navbar />
        <main className="bg-base-200 h-full">sadasdsa</main>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="bg-base-100 border-r flex flex-col h-full">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
