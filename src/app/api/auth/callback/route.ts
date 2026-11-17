import { NextRequest, NextResponse } from "next/server";
import * as oidc from "openid-client";
import { discoverEntra, entraSettings, flowCookie } from "@/lib/entra";
import { isService } from "@/lib/services";
import { authCookie, recaptchaCookie, signPortalCookie, verifyPortalCookie } from "@/lib/portal-session";

export async function GET(request: NextRequest) {
  let service: string | undefined;
  let origin = request.nextUrl.origin;

  function redirect(destination: URL) {
    const response = NextResponse.redirect(destination);
    response.headers.set("Cache-Control", "no-store");
    response.headers.set("Referrer-Policy", "no-referrer");
    response.cookies.set(flowCookie, "", { path: "/api/auth", maxAge: 0 });
    return response;
  }

  const failure = (error: string) => redirect(new URL(isService(service) ? `/${service}?error=${error}` : `/sign-in-error?error=${error}`, origin));

  try {
    const settings = entraSettings();
    if (!settings) return failure("unavailable");
    origin = settings.app.origin;
    const cookie = request.cookies.get(flowCookie)?.value;
    if (!cookie) return failure("expired");
    const flow = JSON.parse(cookie);
    service = flow.service;
    if (!isService(service) || ![flow.verifier, flow.state, flow.nonce].every(value => typeof value === "string" && value.length > 0)) return failure("expired");
    if (request.nextUrl.searchParams.get("state") !== flow.state) return failure("expired");
    if (request.nextUrl.searchParams.has("error")) return failure("denied");

    const config = await discoverEntra(settings);
    // console.log(config);
    
    const callback = new URL(settings.callback);
    callback.search = request.nextUrl.search;
    const tokens = await oidc.authorizationCodeGrant(config, callback, {
      pkceCodeVerifier: flow.verifier,
      expectedState: flow.state,
      expectedNonce: flow.nonce,
      idTokenExpected: true,
    });
    const claims = tokens.claims();
//     console.log(claims);
//     console.log("Entra authorization:", {
//   tenantMatched: claims?.tid === settings.tenant,
//   hasPortalRole:
//     Array.isArray(claims?.roles) &&
//     claims.roles.includes("Portal.User"),
//   rolesPresent: Array.isArray(claims?.roles),
// });
    
    if (claims?.tid !== settings.tenant || !Array.isArray(claims.roles) || !claims.roles.includes("Portal.User")) {
      return failure("denied");
    }
    const captchaPassed = verifyPortalCookie(request.cookies.get(recaptchaCookie)?.value, "recaptcha", settings.secret)?.passed === true;
    const response = redirect(new URL(
      captchaPassed ? `/api/portal/redirect?service=${service}` : `/captcha?service=${service}`,
      origin,
    ));
    response.cookies.set(authCookie(service), signPortalCookie("authorized", { service, issuedAt: Date.now() }, settings.secret), {
      httpOnly: true, secure: settings.app.protocol === "https:", sameSite: "lax", path: "/", maxAge: 600,
    });
    return response;
  } catch {
    return failure("denied");
  }
}
