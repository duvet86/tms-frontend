import { redirect } from "@remix-run/node";

import { authenticator } from "./auth";
import { getSession } from "./session";

export async function get<T>(request: Request, url: string): Promise<T> {
  const session = await getSession(request.headers.get("cookie"));

  const { tokens } = session.get(authenticator.sessionKey);

  const resp = await fetch(`${process.env.API_BASE_URL}/v1/api/${url}`, {
    headers: {
      Authorization: `Bearer ${tokens.access_token}`,
      "Content-Type": "application/json",
    },
  });

  if (!resp.ok) {
    throw redirect("/logout");
  }

  const json = await resp.json();

  return json;
}

export async function post<TBody, TResp>(
  request: Request,
  url: string,
  body: TBody
): Promise<TResp> {
  const session = await getSession(request.headers.get("cookie"));

  const { tokens } = session.get(authenticator.sessionKey);

  const resp = await fetch(`${process.env.API_BASE_URL}/v1/api/${url}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokens.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    throw redirect("/logout");
  }

  const json = await resp.json();

  return json;
}

export async function put<TBody, TResp>(
  request: Request,
  url: string,
  body: TBody
): Promise<TResp> {
  const session = await getSession(request.headers.get("cookie"));

  const { tokens } = session.get(authenticator.sessionKey);

  const resp = await fetch(`${process.env.API_BASE_URL}/v1/api/${url}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${tokens.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    throw redirect("/logout");
  }

  const json = await resp.json();

  return json;
}
