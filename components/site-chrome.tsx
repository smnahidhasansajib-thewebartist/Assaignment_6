"use client";

import Image from "next/image";
import Link from "next/link";
import { Bookmark, ClipboardList, Dumbbell } from "lucide-react";
import { usePathname } from "next/navigation";
import { usePlan } from "@/components/plan-provider";

export function SiteHeader() {
  const pathname = usePathname();
  const { planned, saved } = usePlan();
  const onPlanPage = pathname === "/my-plan";

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="FitLog home">
          <Image src="/logo.png" width={34} height={34} alt="" priority />
          <span>FIT<span>LOG</span></span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <Link className={!onPlanPage ? "nav-link nav-link-active" : "nav-link"} href="/#library">
            Workout
          </Link>
          <Link className={onPlanPage ? "nav-link nav-link-active" : "nav-link"} href="/my-plan">
            My Plan
          </Link>
        </nav>
        <div className="header-badges">
          <Link className="count-badge count-badge-plan" href="/my-plan" aria-label={`${planned.length} exercises in your plan`}>
            <ClipboardList size={15} strokeWidth={2.2} />
            <span>Plan</span>
            <strong>{planned.length}</strong>
          </Link>
          <Link className="count-badge count-badge-saved" href="/my-plan?tab=saved" aria-label={`${saved.length} saved exercises`}>
            <Bookmark size={14} strokeWidth={2.2} />
            <span>Saved</span>
            <strong>{saved.length}</strong>
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Link className="brand footer-brand" href="/" aria-label="FitLog home">
          <Image src="/logo.png" width={30} height={30} alt="" />
          <span>FIT<span>LOG</span></span>
        </Link>
        <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
        <Dumbbell className="footer-mark" size={18} />
      </div>
    </footer>
  );
}
