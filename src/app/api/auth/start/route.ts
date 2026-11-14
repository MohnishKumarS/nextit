import { NextRequest, NextResponse } from "next/server";
import * as oidc from "openid-client";
import { discoverEntra, entraSettings, flowCookie } from "@/lib/entra";
import { isService } from "@/lib/services";

export async function GET(request: NextRequest) {
  const service = request.nextUrl.searchParams.get("service");
  if (!isService(service)) return new NextResponse("Unknown IT service", { status: 400 });
  const unavailable = () => NextResponse.redirect(new URL(`/${service}?error=unavailable`, request.url));

  try {
    const settings = entraSettings();
    if (!settings) return unavailable();
    const config = await discoverEntra(settings);
    const verifier = oidc.randomPKCECodeVerifier();
    const state = oidc.randomState();
    const nonce = oidc.randomNonce();
    const target = oidc.buildAuthorizationUrl(config, {
      redirect_uri: settings.callback.href,
      scope: "openid profile",
      code_challenge: await oidc.calculatePKCECodeChallenge(verifier),
      code_challenge_method: "S256",
      state,
      nonce,
    });

    const response = NextResponse.redirect(target);
    response.headers.set("Cache-Control", "no-store");
    response.cookies.set(flowCookie, JSON.stringify({ verifier, state, nonce, service }), {
      httpOnly: true, secure: settings.app.protocol === "https:", sameSite: "lax",
      path: "/api/auth", maxAge: 600,
    });
    return response;
  } catch {
    return unavailable();
  }
}
