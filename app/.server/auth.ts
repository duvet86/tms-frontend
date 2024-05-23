import type { StrategyVerifyCallback } from "remix-auth";
import type {
  OAuth2StrategyVerifyParams,
  OAuth2Profile,
  TokenResponseBody,
  OAuth2StrategyOptions,
} from "remix-auth-oauth2";

import { Authenticator } from "remix-auth";
import { OAuth2Strategy } from "remix-auth-oauth2";

import { sessionStorage } from "./session";

const SCOPES = ["openid", "profile", "email", "offline_access"];

export interface MicrosoftStrategyOptions
  extends Omit<
    OAuth2StrategyOptions,
    | "authorizationEndpoint"
    | "tokenEndpoint"
    | "authenticateWith"
    | "codeChallengeMethod"
  > {
  tenantId?: string;
  prompt?: string;
}

interface MicrosoftExtraParams extends Record<string, string | number> {
  expires_in: 3599;
  token_type: "Bearer";
  scope: string;
  id_token: string;
}

export interface MicrosoftProfile extends OAuth2Profile {
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

export const authenticator = new Authenticator<User>(sessionStorage);

export class MicrosoftStrategy<User> extends OAuth2Strategy<
  User,
  MicrosoftProfile,
  MicrosoftExtraParams
> {
  private prompt: string;

  name = "microsoft";

  constructor(
    {
      clientId,
      clientSecret,
      redirectURI,
      scopes,
      prompt,
      tenantId,
    }: MicrosoftStrategyOptions,
    verify: StrategyVerifyCallback<
      User,
      OAuth2StrategyVerifyParams<MicrosoftProfile, MicrosoftExtraParams>
    >
  ) {
    super(
      {
        clientId,
        clientSecret,
        redirectURI,
        authorizationEndpoint: `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize`,
        tokenEndpoint: `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
        authenticateWith: "request_body",
        codeChallengeMethod: "S256",
        scopes,
      },
      verify
    );
    this.prompt = prompt ?? "none";
  }

  protected authorizationParams(params: URLSearchParams): URLSearchParams {
    params.set("prompt", this.prompt);

    return params;
  }

  protected async userProfile(
    tokens: TokenResponseBody & MicrosoftExtraParams
  ): Promise<MicrosoftProfile> {
    const resp = await fetch("https://graph.microsoft.com/v1.0/me", {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });

    const user = await resp.json();

    return user;
  }
}

const microsoftStrategy = new MicrosoftStrategy(
  {
    clientId: process.env.CLIENT_ID!,
    clientSecret: process.env.CLIENT_SECRET!,
    redirectURI: "http://localhost:5173/auth/microsoft/callback",
    tenantId: process.env.TENANT_ID,
    scopes: SCOPES,
    prompt: "login",
  },
  async ({ tokens, profile }) => ({ tokens, profile })
);

authenticator.use(microsoftStrategy);
