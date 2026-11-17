import { createHmac, timingSafeEqual } from "node:crypto";
import type { Service } from "@/lib/services";

export const recaptchaCookie = "regent-portal-recaptcha";
const authorizationLifetimeMs = 10 * 60 * 1000;

export function authCookie(service: Service) {
  return `regent-portal-auth-${service}`;
}

export function signPortalCookie(purpose: string, data: Record<string, unknown>, secret: string) {
  const payload = Buffer.from(JSON.stringify({ purpose, ...data })).toString("base64url");
  const signature = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function verifyPortalCookie(value: string | undefined, purpose: string, secret: string) {
  if (!value) return null;
  const [payload, signature, extra] = value.split(".");
  if (!payload || !signature || extra !== undefined) return null;

  const expected = createHmac("sha256", secret).update(payload).digest();
  let actual: Buffer;
  try {
    actual = Buffer.from(signature, "base64url");
  } catch {
    return null;
  }
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;

  try {
    const data: unknown = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (typeof data !== "object" || data === null || !("purpose" in data) || data.purpose !== purpose) return null;
    return data as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function hasAuthorization(value: string | undefined, service: Service, secret: string) {
  const data = verifyPortalCookie(value, "authorized", secret);
  return data?.service === service &&
    typeof data.issuedAt === "number" &&
    data.issuedAt <= Date.now() &&
    Date.now() - data.issuedAt <= authorizationLifetimeMs;
}

export function recaptchaSettings() {
  const siteKey = process.env.RECAPTCHA_SITE_KEY;
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  return siteKey && secret ? { siteKey, secret } : null;
}
