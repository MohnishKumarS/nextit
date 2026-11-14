import * as oidc from "openid-client";

export const flowCookie = "regent-entra-flow";
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function entraSettings() {
  const tenant = process.env.ENTRA_TENANT_ID?.toLowerCase();
  const clientId = process.env.ENTRA_CLIENT_ID;
  const secret = process.env.ENTRA_CLIENT_SECRET;
  const appUrl = process.env.APP_URL;
  if (!tenant || !uuid.test(tenant) || !clientId || !uuid.test(clientId) || !secret || !appUrl) return null;

  const app = new URL(appUrl);
  const localHttp = app.protocol === "http:" && ["localhost", "127.0.0.1"].includes(app.hostname);
  if ((!localHttp && app.protocol !== "https:") || app.username || app.password || app.pathname !== "/" || app.search || app.hash) {
    throw new Error("APP_URL must be an HTTPS origin or a localhost HTTP origin.");
  }

  return { app, tenant, clientId, secret, callback: new URL("/api/auth/callback", app) };
}

export async function discoverEntra(settings: NonNullable<ReturnType<typeof entraSettings>>) {
  return oidc.discovery(
    new URL(`https://login.microsoftonline.com/${settings.tenant}/v2.0`),
    settings.clientId,
    settings.secret,
  );
}
