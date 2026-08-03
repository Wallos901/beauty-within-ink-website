import Link from "next/link";
import styles from "./Footer.module.scss";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Brand */}
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            Beauty Within Ink
          </Link>
          <p>
            Delicate, intentional art.
            <br />
            Permanently yours.
          </p>
        </div>

        {/* Navigation */}
        <div className={styles.col}>
          <h4 className={styles.colHeading}>Navigate</h4>
          <ul className={styles.colLinks}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/gallery">Gallery</Link>
            </li>
            <li>
              <Link href="/consent">Consent Form</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Connect */}
        <div className={styles.col}>
          <h4 className={styles.colHeading}>Connect</h4>
          <p className={styles.colText}>
            Questions? Ideas? I&apos;d love to hear from you.
          </p>
          <Link href="/contact" className={styles.inlineLink}>
            Get in Touch
          </Link>

          <div className={styles.socials}>
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Beauty Within Ink on Instagram"
              className={styles.socialIcon}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Beauty Within Ink on TikTok"
              className={styles.socialIcon}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.49a8.16 8.16 0 0 0 4.77 1.52V7.56a4.85 4.85 0 0 1-1-.87z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; {year} Beauty Within Ink. All rights reserved.</p>
        <p className={styles.disclaimer}>
          Tattoos are permanent. Please read all consent materials carefully.
        </p>
      </div>
    </footer>
  );
}
