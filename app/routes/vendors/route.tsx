import type { Vendor } from "~/.server/models/vendor";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ChevronRightIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

import { get } from "~/.server/api";

export async function loader({ request }: LoaderFunctionArgs) {
  const vendors = await get<Vendor[]>(request, "vendors");

  return json({ vendors });
}

export default function Index() {
  const { vendors } = useLoaderData<typeof loader>();

  return (
    <div className="card w-full bg-base-100 shadow">
      <div className="card-body">
        <h2 className="card-title uppercase">Vendors</h2>

        <div className="overflow-x-auto mb-4">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Contact Number</th>
                <th align="right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map(
                ({ id, name, address, email, contactNumber }, index) => (
                  <tr key={id}>
                    <th>{index + 1}</th>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{address}</td>
                    <td>{contactNumber}</td>
                    <td align="right">
                      <Link
                        className="btn btn-sm btn-neutral"
                        to={id.toString()}
                      >
                        Edit <ChevronRightIcon className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        <div className="card-actions justify-end">
          <Link className="btn btn-primary uppercase" to="new">
            <PlusCircleIcon className="w-6 h-6" /> Create New
          </Link>
        </div>
      </div>
    </div>
  );
}
