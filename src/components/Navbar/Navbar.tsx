"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.scss";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className={[styles.navbar, menuOpen ? styles.menuOpen : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          Beauty Within Ink
        </Link>

        <button
          className={[styles.hamburger, menuOpen ? styles.active : ""]
            .filter(Boolean)
            .join(" ")}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <div
          className={[styles.navLinks, menuOpen ? styles.open : ""]
            .filter(Boolean)
            .join(" ")}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={[styles.link, pathname === href ? styles.active : ""]
                .filter(Boolean)
                .join(" ")}
            >
              {label}
            </Link>
          ))}
          <Link href="/consent" className={styles.consentBtn}>
            Consent Form
          </Link>
        </div>
      </div>
    </nav>
  );
}
