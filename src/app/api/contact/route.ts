import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ─── Transport ────────────────────────────────────────────────────────────────

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

// ─── HTML template ────────────────────────────────────────────────────────────

function buildHtml(p: ContactPayload): string {
  const escaped = p.message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br />");

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8" /></head>
    <body style="margin:0;padding:0;background:#fdf6f0;font-family:'Jost',system-ui,sans-serif;">
      <div style="max-width:600px;margin:0 auto;padding:32px 16px;">

        <!-- Header -->
        <div style="text-align:center;padding:28px;background:linear-gradient(135deg,#fce8ec,#f2c4ce);
                    border-radius:12px;margin-bottom:24px;">
          <h1 style="font-size:26px;font-weight:400;font-style:italic;color:#3d2b35;margin:0 0 4px;">
            Beauty Within Ink
          </h1>
          <p style="font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#c47d96;margin:0;">
            New Contact Form Message
          </p>
        </div>

        <!-- Details -->
        <table style="width:100%;border-collapse:collapse;background:#fff;
                      border-radius:8px;overflow:hidden;border:1px solid #fce8ec;margin-bottom:20px;">
          <tr>
            <td style="padding:10px 14px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;
                       color:#c47d96;width:30%;border-bottom:1px solid #fce8ec;">From</td>
            <td style="padding:10px 14px;font-size:14px;color:#3d2b35;border-bottom:1px solid #fce8ec;">
              ${p.name}
            </td>
          </tr>
          <tr>
            <td style="padding:10px 14px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;
                       color:#c47d96;border-bottom:1px solid #fce8ec;">Reply To</td>
            <td style="padding:10px 14px;font-size:14px;color:#3d2b35;border-bottom:1px solid #fce8ec;">
              <a href="mailto:${p.email}" style="color:#c47d96;">${p.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 14px;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;
                       color:#c47d96;">Subject</td>
            <td style="padding:10px 14px;font-size:14px;color:#3d2b35;">${p.subject}</td>
          </tr>
        </table>

        <!-- Message -->
        <div style="background:#fff;border:1px solid #fce8ec;border-radius:8px;padding:20px 24px;">
          <p style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#c47d96;
                    margin:0 0 12px;">Message</p>
          <p style="font-size:14px;color:#3d2b35;line-height:1.8;margin:0;">${escaped}</p>
        </div>

        <!-- Footer -->
        <p style="font-size:11px;color:#aaa;text-align:center;margin-top:28px;">
          Submitted via beautywithinink.com &nbsp;·&nbsp; ${new Date().toLocaleString()}
        </p>
      </div>
    </body>
    </html>`;
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let payload: ContactPayload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const { name, email, subject, message } = payload;

  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 },
    );
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address." },
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

    await transport.sendMail({
      from: `"Beauty Within Ink" <${process.env.SMTP_USER}>`,
      to: artistEmail,
      replyTo: email,
      subject: `[Contact] ${subject} — ${name}`,
      html: buildHtml(payload),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact/route] sendMail error:", err);
    return NextResponse.json(
      { error: "Failed to send email. Please try again." },
      { status: 500 },
    );
  }
}
