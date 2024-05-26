import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import type { Customer, CustomerCommand } from "~/.server/models/customer";

import { Form, json, useLoaderData } from "@remix-run/react";
import { ServerIcon } from "@heroicons/react/24/solid";

import { get, put } from "~/.server/api";
import invariant from "tiny-invariant";

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.id, "Expected params.id");

  const customer = await get<Customer>(request, `customers/${params.id}`);

  return json({ customer });
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.id, "Expected params.id");

  const body = await request.formData();

  await put<CustomerCommand, Customer>(request, `customers/${params.id}`, {
    name: body.get("name")!.toString(),
    email: body.get("email")!.toString(),
    address: body.get("address")!.toString(),
    contactNumber: body.get("contactNumber")?.toString() ?? null,
  });

  return null;
}

export default function Index() {
  const { customer } = useLoaderData<typeof loader>();

  return (
    <div className="card w-full bg-base-100 shadow">
      <Form method="post" className="card-body">
        <h2 className="card-title uppercase">Edit Customer</h2>

        <label className="form-control my-2" aria-label="name">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            type="text"
            name="name"
            placeholder="Type here"
            defaultValue={customer.name}
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
            defaultValue={customer.email}
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
            defaultValue={customer.address}
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
            defaultValue={customer.contactNumber ?? ""}
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
