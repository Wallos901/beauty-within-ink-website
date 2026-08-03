import type { Metadata } from "next";
import Image from "next/image";
import { listDriveImages } from "@/lib/drive";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Gallery | Beauty Within Ink",
  description:
    "Browse fine line tattoo work by Beauty Within Ink — delicate botanicals, custom pieces, and minimalist designs.",
};

// Always fetch fresh — images are served from the Drive API route which has its own cache headers
export const revalidate = 0;

export default async function GalleryPage() {
  const folderId = process.env.NEXT_PUBLIC_DRIVE_GALLERY_FOLDER_ID;

  const images = folderId
    ? await listDriveImages(folderId).catch((err) => {
        console.error("[gallery] Drive fetch failed:", err);
        return [];
      })
    : [];

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
          {images.length === 0 ? (
            <p className={styles.empty}>No photos yet — check back soon.</p>
          ) : (
            <div className={styles.grid}>
              {images.map((img) => (
                <div key={img.id} className={styles.gridItem}>
                  <Image
                    src={`/api/drive/${img.id}`}
                    alt={img.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ")}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
