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
  displayName: string;
  name: {
    familyName: string;
    givenName: string;
  };
  emails: [{ value: string }];
  _json: {
    sub: string;
    name: string;
    family_name: string;
    given_name: string;
    email: string;
  };
}

interface User {
  tokens: TokenResponseBody & MicrosoftExtraParams;
  profile: MicrosoftProfile;
}

export const authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
  new OAuth2Strategy<User, MicrosoftProfile, MicrosoftExtraParams>(
    async ({ tokens, profile }) => {
      return { profile, tokens };
    }
  ),
  // this is optional, but if you setup more than one OAuth2 instance you will
  // need to set a custom name to each one
  "microsoft"
);
