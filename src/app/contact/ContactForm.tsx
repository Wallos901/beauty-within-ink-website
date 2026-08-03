"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import styles from "./page.module.scss";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type Status = "idle" | "loading" | "success" | "error";

const INITIAL: FormData = { name: "", email: "", subject: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm(INITIAL);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="c-name">
            Full Name <span aria-hidden="true">*</span>
          </label>
          <input
            id="c-name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Jane Doe"
            autoComplete="name"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="c-email">
            Email Address <span aria-hidden="true">*</span>
          </label>
          <input
            id="c-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="jane@example.com"
            autoComplete="email"
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="c-subject">
          Subject <span aria-hidden="true">*</span>
        </label>
        <select
          id="c-subject"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select a subject…
          </option>
          <option value="Booking Inquiry">Booking Inquiry</option>
          <option value="Custom Design">Custom Design</option>
          <option value="Pricing">Pricing</option>
          <option value="General Question">General Question</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="c-message">
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="c-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={7}
          placeholder="Tell me about your tattoo idea, placement, size, or any questions you have…"
        />
      </div>

      {status === "success" && (
        <p className={styles.successMsg} role="status">
          ✓ Message sent! I&apos;ll be in touch within 24–48 hours.
        </p>
      )}
      {status === "error" && (
        <p className={styles.errorMsg} role="alert">
          Something went wrong. Please try again or reach out directly via
          Instagram.
        </p>
      )}

      <button
        type="submit"
        className={styles.submitBtn}
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
