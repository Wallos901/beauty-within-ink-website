import type { Metadata } from "next";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Gallery | Beauty Within Ink",
  description:
    "Browse fine line tattoo work by Beauty Within Ink — delicate botanicals, custom pieces, and minimalist designs.",
};

const GALLERY_ITEMS = Array.from({ length: 12 }, (_, i) => i + 1);

export default function GalleryPage() {
  return (
    <>
      {/* ─── Page hero ──────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className="section-label">Portfolio</span>
          <h1>Gallery</h1>
          <div className="divider" />
          <p>
            Each piece is a story. A collection of fine line work crafted with
            care.
          </p>
        </div>
      </section>

      {/* ─── Grid ───────────────────────────────────────────────────── */}
      <section className={styles.gridSection}>
        <div className={styles.gridInner}>
          <div className={styles.grid}>
            {GALLERY_ITEMS.map((n) => (
              <div key={n} className={styles.gridItem}>
                {/*
                  Replace <div className={styles.placeholder}> with a Next.js
                  <Image> component once you have real tattoo photos.
                  e.g.:
                  <Image
                    src={`/gallery/tattoo-${n}.jpg`}
                    alt="Tattoo description"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                */}
                <div
                  className={styles.placeholder}
                  aria-label={`Tattoo photo ${n} — add your image here`}
                >
                  <span>Add Photo</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
