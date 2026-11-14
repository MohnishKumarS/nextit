import Link from "next/link";

export default function SignInError() {
  return <div className="wrap max-w-2xl py-12">
    <h1 className="text-3xl font-bold">Sign-in could not be completed</h1>
    <p className="mt-3 text-muted">Return to IT Self-Service and open the service again to restart sign-in.</p>
    <Link href="/" className="button mt-5">Back to IT Self-Service</Link>
  </div>;
}
