# Regent College London IT Self-Service

A Next.js App Router project with TypeScript, Tailwind CSS v4 and Lucide icons. The ZIP includes the source, npm lockfile, local branding and campus assets, and environment template.

## Run locally

Use Node.js 22 or later.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. Use `npm run build` and `npm start` for the production build. Deploy on a host that runs Next.js server routes, since the Entra callback requires server-side code.

## Service flows

| Tile | Behaviour |
| --- | --- |
| Password Reset | Opens Microsoft Online Password Reset in a new tab. No portal account is required. |
| Software Centre | Opens the college sign-in handoff, then redirects to the specified RD Web Access URL after Entra verification. |
| Contact IT | Opens the college sign-in handoff, then redirects to the specified Freshservice new-ticket URL after Entra verification. |

## Configure Microsoft Entra ID

1. Register a single-tenant application for accounts in the college directory. Add the **Web** redirect URI `http://localhost:3000/api/auth/callback` for local testing. Add the equivalent HTTPS callback for production.
2. Create a client secret and set `ENTRA_TENANT_ID`, `ENTRA_CLIENT_ID` and `ENTRA_CLIENT_SECRET` in the server environment. Set `APP_URL` to the matching site origin.
3. Create an app role with value `Portal.User` for Users/Groups. In the Enterprise Application, require assignment and assign that role to the approved college users or groups. Keep guest and other ineligible users outside these assignments.
4. Apply the college's Conditional Access policy to this application for MFA. Verify that RD Web and Freshservice also enforce their own sign-in and access policies for users arriving directly at those URLs.
5. Test an assigned college account, an unassigned account and an account from outside the college tenant. Test MFA under the intended policy and confirm the final pages load for assigned users. The destination services may present their own login depending on their configuration.

Visit `/entra-test` to check whether the server environment is configured and Microsoft OpenID Connect discovery succeeds. The page never displays credential values and does not test user sign-in, app-role assignment, or the callback.

Microsoft references: [Web redirect URI](https://learn.microsoft.com/entra/identity-platform/how-to-add-redirect-uri) and [app roles](https://learn.microsoft.com/entra/identity-platform/howto-add-app-roles-in-apps).

Without credentials, the public homepage and password reset still work, and protected pages show the sign-in unavailable state.

## Deploy a Vercel demo

From this project directory, authenticate and deploy:

```sh
npx vercel@latest login
npx vercel@latest
```

Choose your Vercel account, create a project named `regent-it-portal`, use `./`
as the project directory, and keep the detected Next.js settings. The CLI prints
the preview deployment URL after deployment. This does not require a Git repository.
The project uses Webpack for production builds; the production build was verified
with that compiler.

Local `.env` files are excluded from the upload by `.vercelignore`. For a demo
without Microsoft credentials, leave the three `ENTRA_*` variables unset in Vercel.
The homepage and password-reset link work; protected services show the sign-in
unavailable message. This demo does not simulate successful authentication.

For real authentication, set `APP_URL` to the exact HTTPS demo origin and configure
the three `ENTRA_*` variables in Vercel for the intended deployment environment.
Register `https://<your-demo-domain>/api/auth/callback` in Entra, then redeploy.
Use a stable deployment domain when testing authentication.

To deploy to the project's production domain later:

```sh
npx vercel@latest --prod
```

## Deploy to a Linux server with a ZIP

The server needs Node.js 22 or later and npm. Create a source-only archive in the project directory; it excludes local dependencies, build output, Git data and `.env.local`:

```sh
zip -r -X regent-it-portal-deploy.zip \
  package.json package-lock.json next-env.d.ts postcss.config.mjs tsconfig.json \
  README.md .env.example src public
```

Upload `regent-it-portal-deploy.zip` to the server, then run these commands from the directory where you want the app installed (replace the upload path as needed):

```sh
mkdir -p regent-it-portal
unzip /path/to/regent-it-portal-deploy.zip -d regent-it-portal
cd regent-it-portal
npm ci
cp .env.example .env.local
```

Edit `.env.local` on the server and set the production values:

```dotenv
APP_URL=https://your-domain.example
ENTRA_TENANT_ID=your-tenant-id
ENTRA_CLIENT_ID=your-application-client-id
ENTRA_CLIENT_SECRET=your-client-secret
```

Keep the secret private and do not put `.env.local` in the ZIP. Configure the matching HTTPS callback URL (`https://your-domain.example/api/auth/callback`) in the Microsoft Entra app registration. Then build and start the app:

```sh
npm run build
npm start -- --hostname 0.0.0.0 --port 3000
```

The app listens on port 3000 and stays running in the foreground; use your server's service manager (for example, systemd) to keep it running across logouts and reboots. In production, route public HTTPS traffic to the app through a reverse proxy rather than exposing port 3000 directly. After uploading a new ZIP, repeat `npm ci`, `npm run build`, and restart the app.

## Update portal content

- `src/lib/services.ts` contains the service links, resource entries and service desk details.
- `src/components/portal-home.tsx` contains the search, sample metrics and service cards. Search filters the services and resource links listed on the homepage. Replace the mockup's sample figures with approved service metrics if available.
- `src/components/site-chrome.tsx` contains the shared header, service desk strip and footer.
- `src/app/globals.css` contains the shared Tailwind theme and responsive styles.
- The hero image is a generated interpretation of the supplied mockup. Confirm the support hours, additional service links and campus help content before rollout.
