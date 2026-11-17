import { NextRequest, NextResponse } from "next/server";
import { entraSettings } from "@/lib/entra";
import { isService, protectedServices } from "@/lib/services";
import { authCookie, hasAuthorization, recaptchaCookie, verifyPortalCookie } from "@/lib/portal-session";

export async function GET(request: NextRequest) {
  const service = request.nextUrl.searchParams.get("service");
  if (!isService(service)) return new NextResponse("Unknown IT service", { status: 400 });

  let settings: ReturnType<typeof entraSettings>;
  try {
    settings = entraSettings();
  } catch {
    return NextResponse.redirect(new URL(`/${service}?error=unavailable`, request.url));
  }
  if (!settings) return NextResponse.redirect(new URL(`/${service}?error=unavailable`, request.url));

  if (!hasAuthorization(request.cookies.get(authCookie(service))?.value, service, settings.secret)) {
    return NextResponse.redirect(new URL(`/${service}?error=expired`, settings.app));
  }

  const captchaPassed = verifyPortalCookie(
    request.cookies.get(recaptchaCookie)?.value,
    "recaptcha",
    settings.secret,
  )?.passed === true;
  if (!captchaPassed) {
    return NextResponse.redirect(new URL(`/captcha?service=${service}`, settings.app));
  }

  const response = NextResponse.redirect(new URL(protectedServices[service].url));
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("Referrer-Policy", "no-referrer");
  response.cookies.set(authCookie(service), "", { httpOnly: true, secure: settings.app.protocol === "https:", path: "/", maxAge: 0 });
  return response;
}
