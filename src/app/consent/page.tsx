import type { Metadata } from "next";
import styles from "./page.module.scss";
import ConsentForm from "./ConsentForm";

export const metadata: Metadata = {
  title: "Consent Form | Beauty Within Ink",
  description:
    "Complete your tattoo consent form online before your appointment with Beauty Within Ink. A copy will be sent to the artist for your records.",
};

export default function ConsentPage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className="section-label">Before Your Appointment</span>
          <h1>Consent Form</h1>
          <div className="divider" />
          <p>
            Please complete this form honestly and in full. A copy will be sent
            to the studio for your appointment file.
          </p>
        </div>
      </section>

      {/* ─── Form section ─────────────────────────────────────────── */}
      <section className={styles.formSection}>
        <div className={styles.formWrap}>
          <ConsentForm />
        </div>
      </section>
    </>
  );
}
