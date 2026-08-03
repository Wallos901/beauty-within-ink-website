import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Beauty Within Ink | Fine Line Tattoo Artist",
  description:
    "Delicate, intentional fine line tattoo art by Beauty Within Ink. View the gallery, book a consultation, and complete your consent form online.",
};

const SERVICES = [
  {
    icon: "✦",
    title: "Fine Line",
    desc: "Delicate, precise linework with minimal shading for a clean, timeless look.",
  },
  {
    icon: "✿",
    title: "Florals & Botanicals",
    desc: "Soft organic designs inspired by nature — flowers, leaves, and vines.",
  },
  {
    icon: "◈",
    title: "Custom Pieces",
    desc: "Fully bespoke designs tailored to your vision, placement, and story.",
  },
  {
    icon: "⟡",
    title: "Minimalist",
    desc: "Meaningful symbols and text — art that speaks without overpowering.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.eyebrow}>
            Fine Line · Delicate · Intentional
          </span>
          <h1 className={styles.heroTitle}>
            Beauty
            <br />
            <em>Within</em> Ink
          </h1>
          <p className={styles.heroSubtitle}>
            Wearable art crafted with precision and care.
          </p>
          <div className={styles.heroCta}>
            <Link href="/gallery" className={styles.btnOutline}>
              View Gallery
            </Link>
            <Link href="/consent" className={styles.btnPrimary}>
              Consent Form
            </Link>
          </div>
        </div>
        <div className={styles.heroDecor} aria-hidden="true">
          <div className={styles.decorCircle} />
          <div className={styles.decorLine} />
          <div className={styles.decorDot} />
        </div>
      </section>

      {/* ─── About ────────────────────────────────────────────────────── */}
      <section className={styles.about}>
        <div className={styles.aboutInner}>
          <div className={styles.aboutImage}>
            <div
              className={styles.imgPlaceholder}
              aria-label="Artist photo — replace with actual image"
            >
              <span>Artist Photo</span>
            </div>
          </div>
          <div className={styles.aboutContent}>
            <span className="section-label">About the Artist</span>
            <h2>
              Art that lives
              <br />
              on your skin
            </h2>
            <div className="divider" style={{ margin: "1.5rem 0" }} />
            <p>
              Hi, I&apos;m the artist behind Beauty Within Ink — a fine line
              tattoo studio where every piece is crafted with intention. I
              specialise in delicate, minimal designs that feel personal and
              timeless.
            </p>
            <p style={{ marginTop: "1rem" }}>
              Whether it&apos;s a tiny botanical, a meaningful symbol, or a
              fully custom illustration, I&apos;m here to bring your vision to
              life with care and precision.
            </p>
            <Link href="/contact" className={styles.btnOutlineSm}>
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Services ─────────────────────────────────────────────────── */}
      <section className={styles.services}>
        <div className={styles.servicesInner}>
          <span className="section-label" style={{ textAlign: "center" }}>
            What I Offer
          </span>
          <h2 className={styles.sectionTitle}>Specialties</h2>
          <div className="divider" />
          <div className={styles.serviceGrid}>
            {SERVICES.map((s) => (
              <div key={s.title} className={styles.serviceCard}>
                <span className={styles.serviceIcon} aria-hidden="true">
                  {s.icon}
                </span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Gallery Preview ──────────────────────────────────────────── */}
      <section className={styles.galleryPreview}>
        <div className={styles.galleryPreviewInner}>
          <span className="section-label" style={{ textAlign: "center" }}>
            Recent Work
          </span>
          <h2 className={styles.sectionTitle}>Portfolio Glimpse</h2>
          <div className="divider" />
          <div className={styles.previewGrid}>
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={styles.previewItem}
                aria-label={`Gallery preview ${n}`}
              >
                <span>Add Photo</span>
              </div>
            ))}
          </div>
          <div className={styles.previewCta}>
            <Link href="/gallery" className={styles.btnPrimary}>
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ───────────────────────────────────────────────── */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaBannerInner}>
          <h2>Ready to start your journey?</h2>
          <p>
            Fill out the consent form before your appointment, or reach out to
            chat about your idea.
          </p>
          <div className={styles.ctaBtns}>
            <Link href="/consent" className={styles.btnPrimaryLight}>
              Fill Consent Form
            </Link>
            <Link href="/contact" className={styles.btnOutlineLight}>
              Contact Me
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
