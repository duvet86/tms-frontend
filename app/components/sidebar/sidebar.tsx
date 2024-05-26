import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Link, NavLink } from "@remix-run/react";

export function Sidebar() {
  return (
    <>
      <div className="h-16 shadow-sm">
        <Link to="/" className="btn btn-ghost m-1">
          <img
            src="/images/logo-green.png"
            alt="logo"
            width={180}
            height={48}
          />
          TMS
        </Link>
      </div>
      <ul className="menu p-4 w-80 border-r">
        <li className="border-b py-2">
          <NavLink
            to="/"
            className="flex items-center justify-between text-base font-medium uppercase"
          >
            Home <ChevronRightIcon className="w-6 h-6" />
          </NavLink>
        </li>
        <li className="border-b py-2">
          <NavLink
            to="/scheduling"
            className="flex items-center justify-between text-base font-medium uppercase"
          >
            Scheduling <ChevronRightIcon className="w-6 h-6" />
          </NavLink>
        </li>
        <li className="border-b py-2">
          <NavLink
            to="/customers"
            className="flex items-center justify-between text-base font-medium uppercase"
          >
            Customers <ChevronRightIcon className="w-6 h-6" />
          </NavLink>
        </li>
        <li className="border-b py-2">
          <NavLink
            to="/vendors"
            className="flex items-center justify-between text-base font-medium uppercase"
          >
            Vendors <ChevronRightIcon className="w-6 h-6" />
          </NavLink>
        </li>
      </ul>
    </>
  );
}
