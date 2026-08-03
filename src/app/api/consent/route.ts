import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ConsentPayload {
  fullName: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelationship: string;
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
  designDescription: string;
  placement: string;
  approximateSize: string;
  agreeToTerms: boolean;
  confirmAge: boolean;
  signature: string;
  signatureDate: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function yn(val: string) {
  if (val === "yes")
    return '<span style="color:#c47d96;font-weight:500;">Yes</span>';
  if (val === "no") return "No";
  return '<em style="color:#aaa;">Not answered</em>';
}

function row(label: string, value: string | undefined) {
  const display = value?.trim() || '<em style="color:#aaa;">—</em>';
  return `
    <tr>
      <td style="padding:8px 12px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;
                 color:#c47d96;width:38%;vertical-align:top;border-bottom:1px solid #fce8ec;">
        ${label}
      </td>
      <td style="padding:8px 12px;font-size:14px;color:#3d2b35;
                 border-bottom:1px solid #fce8ec;">
        ${display}
      </td>
    </tr>`;
}

function section(title: string, rows: string) {
  return `
    <h3 style="font-size:18px;font-weight:400;color:#3d2b35;margin:28px 0 8px;
               letter-spacing:0.01em;border-bottom:2px solid #f2c4ce;padding-bottom:6px;">
      ${title}
    </h3>
    <table style="width:100%;border-collapse:collapse;background:#fff;
                  border-radius:8px;overflow:hidden;border:1px solid #fce8ec;">
      ${rows}
    </table>`;
}

function buildHtml(p: ConsentPayload): string {
  const personalRows =
    row("Full Name", p.fullName) +
    row("Date of Birth", p.dateOfBirth) +
    row("Phone", p.phone) +
    row("Email", p.email) +
    row(
      "Address",
      [p.address, p.city, p.state, p.zip].filter(Boolean).join(", "),
    );

  const emergencyRows =
    row("Name", p.emergencyName) +
    row("Phone", p.emergencyPhone) +
    row("Relationship", p.emergencyRelationship);

  const healthRows =
    row("Pregnant / Breastfeeding", yn(p.isPregnant)) +
    row("Bleeding Disorder / Thinners", yn(p.hasBleedingDisorder)) +
    row("Diabetes", yn(p.hasDiabetes)) +
    row("Skin Condition", yn(p.hasSkinCondition)) +
    (p.skinConditionDetails ? row("  ↳ Details", p.skinConditionDetails) : "") +
    row("Allergies (latex/ink/etc.)", yn(p.hasAllergies)) +
    (p.allergyDetails ? row("  ↳ Allergy Details", p.allergyDetails) : "") +
    row("Takes Medications", yn(p.takesMedications)) +
    (p.medicationList ? row("  ↳ Medications", p.medicationList) : "") +
    row("Alcohol / Substances (24h)", yn(p.consumedAlcohol)) +
    (p.otherMedical ? row("Other Medical Info", p.otherMedical) : "");

  const tattooRows =
    row("Design Description", p.designDescription) +
    row("Placement", p.placement) +
    row("Approximate Size", p.approximateSize);

  const signatureRows =
    row(
      "Signature",
      `<em style="font-family:Georgia,serif;font-size:15px;">${p.signature}</em>`,
    ) +
    row("Date", p.signatureDate) +
    row("Agreed to Terms", p.agreeToTerms ? "Yes" : "No") +
    row("Confirmed 18+", p.confirmAge ? "Yes" : "No");

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8" /></head>
    <body style="margin:0;padding:0;background:#fdf6f0;font-family:'Jost',system-ui,sans-serif;">
      <div style="max-width:680px;margin:0 auto;padding:32px 16px;">

        <!-- Header -->
        <div style="text-align:center;padding:32px;background:linear-gradient(135deg,#fce8ec,#f2c4ce);
                    border-radius:12px;margin-bottom:24px;">
          <h1 style="font-size:28px;font-weight:400;font-style:italic;color:#3d2b35;margin:0 0 4px;">
            Beauty Within Ink
          </h1>
          <p style="font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#c47d96;margin:0;">
            Tattoo Consent Form Submission
          </p>
        </div>

        <p style="font-size:14px;color:#7d6b73;margin-bottom:24px;line-height:1.7;">
          A new consent form has been submitted. All details are below.
        </p>

        ${section("Personal Information", personalRows)}
        ${section("Emergency Contact", emergencyRows)}
        ${section("Health Disclosure", healthRows)}
        ${section("Tattoo Details", tattooRows)}
        ${section("Consent &amp; Signature", signatureRows)}

        <!-- Footer -->
        <p style="font-size:11px;color:#aaa;text-align:center;margin-top:32px;">
          Submitted via beautywithinink.com &nbsp;·&nbsp; ${new Date().toLocaleString()}
        </p>
      </div>
    </body>
    </html>`;
}

// ─── Required env vars ────────────────────────────────────────────────────────

function getTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error("Missing required SMTP environment variables.");
  }
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT ?? 587) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let payload: ConsentPayload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  // Basic validation of required fields
  const required: (keyof ConsentPayload)[] = [
    "fullName",
    "dateOfBirth",
    "phone",
    "email",
    "emergencyName",
    "emergencyPhone",
    "emergencyRelationship",
    "designDescription",
    "placement",
    "approximateSize",
    "signature",
  ];
  for (const field of required) {
    if (!payload[field]) {
      return NextResponse.json(
        { error: `Missing required field: ${field}` },
        { status: 400 },
      );
    }
  }

  if (!payload.agreeToTerms || !payload.confirmAge) {
    return NextResponse.json(
      { error: "Client must agree to terms and confirm age." },
      { status: 400 },
    );
  }

  const artistEmail = process.env.ARTIST_EMAIL;
  if (!artistEmail) {
    return NextResponse.json(
      { error: "Artist email is not configured." },
      { status: 500 },
    );
  }

  try {
    const transport = getTransport();
    const html = buildHtml(payload);

    await transport.sendMail({
      from: `"Beauty Within Ink" <${process.env.SMTP_USER}>`,
      to: artistEmail,
      replyTo: payload.email,
      subject: `Consent Form — ${payload.fullName} (${payload.signatureDate})`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[consent/route] sendMail error:", err);
    return NextResponse.json(
      { error: "Failed to send email. Please try again." },
      { status: 500 },
    );
  }
}
