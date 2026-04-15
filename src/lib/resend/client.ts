import { Resend } from "resend";

let _resend: Resend | null = null;

export function getResendClient(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("RESEND_API_KEY is not set");
    _resend = new Resend(key);
  }
  return _resend;
}

// Legacy named export for any existing callers
export const resend = new Proxy({} as Resend, {
  get(_target, prop) {
    return getResendClient()[prop as keyof Resend];
  },
});
