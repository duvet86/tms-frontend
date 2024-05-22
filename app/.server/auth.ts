import { Authenticator } from "remix-auth";
import {
  OAuth2Strategy,
  type OAuth2Profile,
  type TokenResponseBody,
} from "remix-auth-oauth2";

import { sessionStorage } from "./session";

interface MicrosoftExtraParams extends Record<string, string | number> {
  expires_in: 3599;
  token_type: "Bearer";
  scope: string;
  id_token: string;
}

interface MicrosoftProfile extends OAuth2Profile {
  id: string;
  userPrincipalName: string;
  displayName: string;
  givenName: string | null;
  surname: string | null;
}

interface User {
  tokens: TokenResponseBody & MicrosoftExtraParams;
  profile: MicrosoftProfile;
}

const TENANT_ID = process.env.TENANT_ID;

export const authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
  new OAuth2Strategy<User, MicrosoftProfile, MicrosoftExtraParams>(
    {
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,

      authorizationEndpoint: `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/authorize`,
      tokenEndpoint: `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`,
      redirectURI: "http://localhost:5173/auth-callback",

      tokenRevocationEndpoint: `https://login.microsoftonline.com/${TENANT_ID}/oauth2/logout`,

      codeChallengeMethod: "S256", // optional
      scopes: ["openid", "email", "profile"], // optional

      authenticateWith: "request_body", // optional
    },
    async ({ tokens, profile }) => {
      const resp = await fetch("https://graph.microsoft.com/v1.0/me", {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      });

      const user = await resp.json();

      return { tokens, profile: { ...profile, ...user } };
    }
  ),
  // this is optional, but if you setup more than one OAuth2 instance you will
  // need to set a custom name to each one
  "microsoft"
);
