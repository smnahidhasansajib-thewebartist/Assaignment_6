import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="not-found-page section-wrap">
      <span className="eyebrow">404 / WRONG TURN</span>
      <p className="not-found-code">404</p>
      <h1 className="display-heading">THIS REP DOESN&apos;T EXIST.</h1>
      <p className="muted">That page isn&apos;t in the program. Let&apos;s get you back on track.</p>
      <Link className="button button-primary" href="/"><ArrowLeft size={15} /> Back to FitLog</Link>
    </main>
  );
}
