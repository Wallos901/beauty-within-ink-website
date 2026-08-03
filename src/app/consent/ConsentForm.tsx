"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import styles from "./page.module.scss";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ConsentData {
  // Personal
  fullName: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;

  // Emergency contact
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelationship: string;

  // Health — yes / no
  isPregnant: string;
  hasBleedingDisorder: string;
  hasDiabetes: string;
  hasSkinCondition: string;
  skinConditionDetails: string;
  hasAllergies: string;
  allergyDetails: string;
  takesMedications: string;
  medicationList: string;
  consumedAlcohol: string;
  otherMedical: string;

  // Tattoo details
  designDescription: string;
  placement: string;
  approximateSize: string;

  // Agreement
  agreeToTerms: boolean;
  confirmAge: boolean;
  signature: string;
  signatureDate: string;
}

type Status = "idle" | "loading" | "success" | "error";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const today = () => new Date().toISOString().split("T")[0];

const INITIAL: ConsentData = {
  fullName: "",
  dateOfBirth: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  emergencyName: "",
  emergencyPhone: "",
  emergencyRelationship: "",
  isPregnant: "",
  hasBleedingDisorder: "",
  hasDiabetes: "",
  hasSkinCondition: "",
  skinConditionDetails: "",
  hasAllergies: "",
  allergyDetails: "",
  takesMedications: "",
  medicationList: "",
  consumedAlcohol: "",
  otherMedical: "",
  designDescription: "",
  placement: "",
  approximateSize: "",
  agreeToTerms: false,
  confirmAge: false,
  signature: "",
  signatureDate: today(),
};

const WAIVER_TEXT = `TATTOO CONSENT & RELEASE FORM — Beauty Within Ink

AGE & IDENTIFICATION
I confirm that I am 18 years of age or older and am legally able to consent to tattooing in my jurisdiction.

MEDICAL DISCLOSURE
I have truthfully disclosed all relevant medical conditions, current medications, and known allergies. I understand that undisclosed conditions may affect the safety or outcome of my tattoo.

INHERENT RISKS
I acknowledge that tattooing involves inherent risks including, but not limited to: infection, scarring (including keloid scarring), allergic reactions to ink or equipment materials, and unsatisfactory results due to skin type or healing.

PERMANENCE
I understand that tattoos are permanent. Laser removal is costly, painful, and may be incomplete. I have carefully considered my design and placement.

AFTERCARE RESPONSIBILITY
I agree to follow all aftercare instructions provided by my artist. I understand that failure to do so may result in poor healing, infection, or damage to the tattoo. Aftercare-related outcomes are my responsibility.

ARTISTIC REPRESENTATION
I understand that slight variations from any reference image are normal and part of the artistic process. The completed tattoo is an original work of art by my artist.

PHOTOGRAPHY & PORTFOLIO
I grant Beauty Within Ink permission to photograph the completed tattoo for portfolio, social media, and promotional use. My personal identifying information will not be shared.

RELEASE OF LIABILITY
By signing below, I release and discharge Beauty Within Ink and the artist from any and all claims, demands, or causes of action arising from the tattooing procedure, provided that reasonable professional care has been exercised.

I have read, understood, and voluntarily agree to the above terms.`;

// ─── Component ───────────────────────────────────────────────────────────────

export default function ConsentForm() {
  const [form, setForm] = useState<ConsentData>(INITIAL);
  const [status, setStatus] = useState<Status>("idle");

  const set = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ ...INITIAL, signatureDate: today() });
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className={styles.successCard}>
        <div className={styles.successIcon} aria-hidden="true">
          ✓
        </div>
        <h2>Form Submitted Successfully</h2>
        <p>
          Thank you, <strong>{form.fullName || "client"}</strong>. Your consent
          form has been received. A copy has been sent to the studio. See you at
          your appointment!
        </p>
        <button className={styles.resetBtn} onClick={() => setStatus("idle")}>
          Submit Another Form
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* ── 1. Personal Information ─────────────────────────────── */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Personal Information</legend>

        <div className={styles.formGroup}>
          <label htmlFor="cf-fullName">
            Full Legal Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="cf-fullName"
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={set}
            required
            placeholder="Jane Doe"
            autoComplete="name"
          />
        </div>

        <div className={styles.formRow2}>
          <div className={styles.formGroup}>
            <label htmlFor="cf-dob">
              Date of Birth <span aria-hidden="true">*</span>
            </label>
            <input
              id="cf-dob"
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={set}
              required
              max={today()}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="cf-phone">
              Phone Number <span aria-hidden="true">*</span>
            </label>
            <input
              id="cf-phone"
              type="tel"
              name="phone"
              value={form.phone}
              onChange={set}
              required
              placeholder="(555) 123-4567"
              autoComplete="tel"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="cf-email">
            Email Address <span aria-hidden="true">*</span>
          </label>
          <input
            id="cf-email"
            type="email"
            name="email"
            value={form.email}
            onChange={set}
            required
            placeholder="jane@example.com"
            autoComplete="email"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="cf-address">Street Address</label>
          <input
            id="cf-address"
            type="text"
            name="address"
            value={form.address}
            onChange={set}
            placeholder="123 Main St"
            autoComplete="street-address"
          />
        </div>

        <div className={styles.formRow3}>
          <div className={styles.formGroup}>
            <label htmlFor="cf-city">City</label>
            <input
              id="cf-city"
              type="text"
              name="city"
              value={form.city}
              onChange={set}
              placeholder="City"
              autoComplete="address-level2"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="cf-state">State</label>
            <input
              id="cf-state"
              type="text"
              name="state"
              value={form.state}
              onChange={set}
              placeholder="State"
              autoComplete="address-level1"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="cf-zip">ZIP Code</label>
            <input
              id="cf-zip"
              type="text"
              name="zip"
              value={form.zip}
              onChange={set}
              placeholder="00000"
              autoComplete="postal-code"
            />
          </div>
        </div>
      </fieldset>

      {/* ── 2. Emergency Contact ────────────────────────────────── */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Emergency Contact</legend>

        <div className={styles.formRow2}>
          <div className={styles.formGroup}>
            <label htmlFor="cf-emergencyName">
              Name <span aria-hidden="true">*</span>
            </label>
            <input
              id="cf-emergencyName"
              type="text"
              name="emergencyName"
              value={form.emergencyName}
              onChange={set}
              required
              placeholder="Contact Name"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="cf-emergencyPhone">
              Phone <span aria-hidden="true">*</span>
            </label>
            <input
              id="cf-emergencyPhone"
              type="tel"
              name="emergencyPhone"
              value={form.emergencyPhone}
              onChange={set}
              required
              placeholder="(555) 123-4567"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="cf-emergencyRel">
            Relationship <span aria-hidden="true">*</span>
          </label>
          <select
            id="cf-emergencyRel"
            name="emergencyRelationship"
            value={form.emergencyRelationship}
            onChange={set}
            required
          >
            <option value="" disabled>
              Select relationship…
            </option>
            <option>Parent / Guardian</option>
            <option>Spouse / Partner</option>
            <option>Sibling</option>
            <option>Friend</option>
            <option>Other</option>
          </select>
        </div>
      </fieldset>

      {/* ── 3. Health Disclosure ────────────────────────────────── */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Health Disclosure</legend>
        <p className={styles.fieldsetNote}>
          Please answer all questions honestly. This information is kept
          strictly confidential and used only to ensure your safety.
        </p>

        {/* Pregnancy */}
        <YesNo
          id="isPregnant"
          name="isPregnant"
          value={form.isPregnant}
          onChange={set}
          question="Are you currently pregnant or breastfeeding?"
        />

        {/* Blood thinners */}
        <YesNo
          id="hasBleedingDisorder"
          name="hasBleedingDisorder"
          value={form.hasBleedingDisorder}
          onChange={set}
          question="Do you have a bleeding disorder or take blood thinners (e.g. Warfarin, Aspirin, Heparin)?"
        />

        {/* Diabetes */}
        <YesNo
          id="hasDiabetes"
          name="hasDiabetes"
          value={form.hasDiabetes}
          onChange={set}
          question="Do you have diabetes?"
        />

        {/* Skin conditions */}
        <YesNo
          id="hasSkinCondition"
          name="hasSkinCondition"
          value={form.hasSkinCondition}
          onChange={set}
          question="Do you have any skin conditions (e.g. eczema, psoriasis, keloid scarring, rosacea)?"
        />
        {form.hasSkinCondition === "yes" && (
          <div className={`${styles.formGroup} ${styles.conditional}`}>
            <label htmlFor="cf-skinDetails">
              Please describe your condition(s)
            </label>
            <textarea
              id="cf-skinDetails"
              name="skinConditionDetails"
              value={form.skinConditionDetails}
              onChange={set}
              rows={3}
              placeholder="e.g. eczema on arms, tends to flare in summer…"
            />
          </div>
        )}

        {/* Allergies */}
        <YesNo
          id="hasAllergies"
          name="hasAllergies"
          value={form.hasAllergies}
          onChange={set}
          question="Do you have known allergies to latex, ink, numbing agents, or metal?"
        />
        {form.hasAllergies === "yes" && (
          <div className={`${styles.formGroup} ${styles.conditional}`}>
            <label htmlFor="cf-allergyDetails">
              Please list your allergies
            </label>
            <input
              id="cf-allergyDetails"
              type="text"
              name="allergyDetails"
              value={form.allergyDetails}
              onChange={set}
              placeholder="e.g. latex, lidocaine…"
            />
          </div>
        )}

        {/* Medications */}
        <YesNo
          id="takesMedications"
          name="takesMedications"
          value={form.takesMedications}
          onChange={set}
          question="Are you currently taking any prescription or over-the-counter medications?"
        />
        {form.takesMedications === "yes" && (
          <div className={`${styles.formGroup} ${styles.conditional}`}>
            <label htmlFor="cf-medicationList">
              Please list your medications
            </label>
            <input
              id="cf-medicationList"
              type="text"
              name="medicationList"
              value={form.medicationList}
              onChange={set}
              placeholder="e.g. Ibuprofen, Metformin…"
            />
          </div>
        )}

        {/* Alcohol / substances */}
        <YesNo
          id="consumedAlcohol"
          name="consumedAlcohol"
          value={form.consumedAlcohol}
          onChange={set}
          question="Have you consumed alcohol or recreational substances in the last 24 hours?"
        />

        {/* Other */}
        <div className={styles.formGroup} style={{ marginTop: "1.25rem" }}>
          <label htmlFor="cf-otherMedical">
            Any other medical information the artist should know?
          </label>
          <textarea
            id="cf-otherMedical"
            name="otherMedical"
            value={form.otherMedical}
            onChange={set}
            rows={3}
            placeholder="Anything else that may be relevant to your session…"
          />
        </div>
      </fieldset>

      {/* ── 4. Tattoo Details ───────────────────────────────────── */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Tattoo Details</legend>

        <div className={styles.formGroup}>
          <label htmlFor="cf-design">
            Describe Your Design <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="cf-design"
            name="designDescription"
            value={form.designDescription}
            onChange={set}
            required
            rows={4}
            placeholder="e.g. Small fine-line daisy with a stem, minimalist style, no shading…"
          />
        </div>

        <div className={styles.formRow2}>
          <div className={styles.formGroup}>
            <label htmlFor="cf-placement">
              Placement on Body <span aria-hidden="true">*</span>
            </label>
            <input
              id="cf-placement"
              type="text"
              name="placement"
              value={form.placement}
              onChange={set}
              required
              placeholder="e.g. inner wrist, behind ear…"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="cf-size">
              Approximate Size <span aria-hidden="true">*</span>
            </label>
            <input
              id="cf-size"
              type="text"
              name="approximateSize"
              value={form.approximateSize}
              onChange={set}
              required
              placeholder="e.g. 2 inches, palm-sized…"
            />
          </div>
        </div>
      </fieldset>

      {/* ── 5. Consent & Agreement ──────────────────────────────── */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Consent &amp; Agreement</legend>

        <div
          className={styles.waiverBox}
          tabIndex={0}
          aria-label="Waiver text — please read"
        >
          <pre className={styles.waiverText}>{WAIVER_TEXT}</pre>
        </div>

        <div className={styles.checkRow}>
          <input
            id="cf-terms"
            type="checkbox"
            name="agreeToTerms"
            checked={form.agreeToTerms}
            onChange={set}
            required
          />
          <label htmlFor="cf-terms">
            I have read and agree to the full consent &amp; release agreement
            above. <span aria-hidden="true">*</span>
          </label>
        </div>

        <div className={styles.checkRow}>
          <input
            id="cf-age"
            type="checkbox"
            name="confirmAge"
            checked={form.confirmAge}
            onChange={set}
            required
          />
          <label htmlFor="cf-age">
            I confirm that I am 18 years of age or older.{" "}
            <span aria-hidden="true">*</span>
          </label>
        </div>
      </fieldset>

      {/* ── 6. Digital Signature ────────────────────────────────── */}
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Digital Signature</legend>
        <p className={styles.fieldsetNote}>
          Type your full legal name below as your digital signature. By doing so
          you confirm that all information provided is accurate and that you
          agree to the terms above.
        </p>

        <div className={styles.formRow2}>
          <div className={styles.formGroup}>
            <label htmlFor="cf-signature">
              Full Legal Name (Signature) <span aria-hidden="true">*</span>
            </label>
            <input
              id="cf-signature"
              type="text"
              name="signature"
              value={form.signature}
              onChange={set}
              required
              placeholder="Type your full name…"
              className={styles.signatureInput}
              autoComplete="off"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="cf-sigDate">Date</label>
            <input
              id="cf-sigDate"
              type="date"
              name="signatureDate"
              value={form.signatureDate}
              onChange={set}
              readOnly
            />
          </div>
        </div>
      </fieldset>

      {/* ── Feedback + Submit ────────────────────────────────────── */}
      {status === "error" && (
        <p className={styles.errorMsg} role="alert">
          Something went wrong sending your form. Please try again or contact
          the studio directly.
        </p>
      )}

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={status === "loading"}
      >
        {status === "loading" ? "Submitting…" : "Submit Consent Form"}
      </button>

      <p className={styles.formDisclaimer}>
        By submitting this form you confirm that all information is accurate and
        that you have read and agreed to the consent terms above.
      </p>
    </form>
  );
}

// ─── YesNo Radio sub-component ───────────────────────────────────────────────
interface YesNoProps {
  id: string;
  name: string;
  value: string;
  question: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function YesNo({ id, name, value, question, onChange }: YesNoProps) {
  return (
    <div className={styles.yesNoRow}>
      <p className={styles.yesNoQuestion}>{question}</p>
      <div className={styles.yesNoOptions}>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name={name}
            value="yes"
            checked={value === "yes"}
            onChange={onChange}
          />
          Yes
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name={name}
            value="no"
            checked={value === "no"}
            onChange={onChange}
          />
          No
        </label>
      </div>
    </div>
  );
}
