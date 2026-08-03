import type { Metadata } from "next";
import styles from "./page.module.scss";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact | Beauty Within Ink",
  description:
    "Reach out with booking inquiries, custom design questions, or anything else. Beauty Within Ink responds within 24–48 hours.",
};

export default function ContactPage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className="section-label">Reach Out</span>
          <h1>Contact</h1>
          <div className="divider" />
          <p>
            Questions about booking, design ideas, or pricing? I&apos;d love to
            hear from you.
          </p>
        </div>
      </section>

      {/* ─── Contact section ──────────────────────────────────────── */}
      <section className={styles.contactSection}>
        <div className={styles.contactInner}>
          {/* Info panel */}
          <aside className={styles.info}>
            <h2>Let&apos;s Connect</h2>
            <p>
              Fill out the form and I&apos;ll get back to you as soon as
              possible. For bookings, please allow 24–48 hours for a response.
            </p>

            <div className={styles.infoCards}>
              <div className={styles.infoCard}>
                <span className={styles.infoLabel}>Response Time</span>
                <span className={styles.infoValue}>24–48 hours</span>
              </div>
              <div className={styles.infoCard}>
                <span className={styles.infoLabel}>Consent Form</span>
                <span className={styles.infoValue}>
                  Required before your appointment.{" "}
                  <a href="/consent">Fill it out here.</a>
                </span>
              </div>
              <div className={styles.infoCard}>
                <span className={styles.infoLabel}>First Appointment?</span>
                <span className={styles.infoValue}>
                  Let me know in your message — I&apos;ll walk you through
                  everything.
                </span>
              </div>
            </div>
          </aside>

          {/* Form */}
          <ContactForm />
        </div>
      </section>
    </>
  );
}
