import { NextRequest, NextResponse } from "next/server";
import { entraSettings } from "@/lib/entra";
import { isService } from "@/lib/services";
import { authCookie, hasAuthorization, recaptchaCookie, recaptchaSettings, signPortalCookie } from "@/lib/portal-session";

function captchaPage(origin: string, service: string, error: string) {
  return NextResponse.redirect(new URL(`/captcha?service=${service}&error=${error}`, origin), 303);
}

export async function POST(request: NextRequest) {
  let settings: ReturnType<typeof entraSettings>;
  try {
    settings = entraSettings();
  } catch {
    return NextResponse.redirect(new URL("/sign-in-error?error=unavailable", request.url), 303);
  }
  if (!settings) return NextResponse.redirect(new URL("/sign-in-error?error=unavailable", request.url), 303);
  const origin = settings.app.origin;

  if (request.headers.get("origin") !== origin) {
    return NextResponse.redirect(new URL("/sign-in-error?error=denied", origin), 303);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.redirect(new URL("/sign-in-error?error=denied", origin), 303);
  }

  const service = form.get("service");
  if (typeof service !== "string" || !isService(service)) {
    return NextResponse.redirect(new URL("/sign-in-error?error=denied", origin), 303);
  }

  if (!hasAuthorization(request.cookies.get(authCookie(service))?.value, service, settings.secret)) {
    return NextResponse.redirect(new URL(`/${service}?error=expired`, origin), 303);
  }

  const captcha = recaptchaSettings();
  if (!captcha) return captchaPage(origin, service, "unavailable");

  const token = form.get("g-recaptcha-response");
  if (typeof token !== "string" || token.length === 0 || token.length > 10_000) {
    return captchaPage(origin, service, "required");
  }

  try {
    const body = new URLSearchParams({ secret: captcha.secret, response: token });
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return captchaPage(origin, service, "unavailable");
    const result: unknown = await response.json();
    if (typeof result !== "object" || result === null || !("success" in result) || !("hostname" in result)) {
      return captchaPage(origin, service, "unavailable");
    }
    if (result.success !== true || typeof result.hostname !== "string" ||
        result.hostname.toLowerCase() !== settings.app.hostname.toLowerCase()) {
      return captchaPage(origin, service, "failed");
    }
  } catch {
    return captchaPage(origin, service, "unavailable");
  }

  const response = NextResponse.redirect(new URL(`/api/portal/redirect?service=${service}`, origin), 303);
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("Referrer-Policy", "no-referrer");
  response.cookies.set(recaptchaCookie, signPortalCookie("recaptcha", { passed: true }, settings.secret), {
    httpOnly: true, secure: settings.app.protocol === "https:", sameSite: "lax", path: "/",
  });
  return response;
}
