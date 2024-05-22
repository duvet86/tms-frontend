import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "@remix-run/react";

export function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm h-16">
      <div className="flex-1"></div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <UserCircleIcon />
          </div>
          <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
