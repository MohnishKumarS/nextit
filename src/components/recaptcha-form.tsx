"use client";

import Script from "next/script";
import type { Service } from "@/lib/services";

type Props = { siteKey: string; service: Service };

export default function RecaptchaForm({ siteKey, service }: Props) {
  return <>
    <form className="mt-5" action="/api/auth/recaptcha" method="post">
      <input type="hidden" name="service" value={service} />
      <div className="g-recaptcha" data-sitekey={siteKey} />
      <button type="submit" className="button mt-4 cursor-pointer">Continue</button>
    </form>
    <Script src="https://www.google.com/recaptcha/api.js" strategy="afterInteractive" />
  </>;
}
