import type { ActionFunctionArgs } from "@remix-run/node";
import type { Vendor, VendorCommand } from "~/.server/models/vendor";

import { Form, redirect } from "@remix-run/react";
import { ServerIcon } from "@heroicons/react/24/solid";

import { post } from "~/.server/api";

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();

  const vendor = await post<VendorCommand, Vendor>(request, "vendors", {
    name: body.get("name")!.toString(),
    email: body.get("email")!.toString(),
    address: body.get("address")!.toString(),
    contactNumber: body.get("contactNumber")?.toString() ?? null,
  });

  return redirect(`/vendors/${vendor.id}`);
}

export default function Index() {
  return (
    <div className="card w-full bg-base-100 shadow">
      <Form method="post" className="card-body">
        <h2 className="card-title uppercase">New Vendor</h2>

        <label className="form-control my-2" aria-label="name">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            type="text"
            name="name"
            placeholder="Type here"
            className="input input-bordered"
          />
        </label>

        <label className="form-control my-2" aria-label="email">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            type="email"
            name="email"
            placeholder="Type here"
            className="input input-bordered"
          />
        </label>

        <label className="form-control my-2" aria-label="address">
          <div className="label">
            <span className="label-text">Address</span>
          </div>
          <input
            type="text"
            name="address"
            placeholder="Type here"
            className="input input-bordered"
          />
        </label>

        <label className="form-control my-2" aria-label="contactNumber">
          <div className="label">
            <span className="label-text">Contact Number</span>
          </div>
          <input
            type="text"
            name="contactNumber"
            placeholder="Type here"
            className="input input-bordered"
          />
        </label>

        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary uppercase" type="submit">
            <ServerIcon className="w-6 h-6" /> Save
          </button>
        </div>
      </Form>
    </div>
  );
}
