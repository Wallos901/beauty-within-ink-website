import { google } from "googleapis";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DriveImage {
  id: string;
  name: string;
  mimeType: string;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

function getAuth() {
  const credentials = process.env.NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!credentials) {
    throw new Error(
      "Missing NEXT_PUBLIC_GOOGLE_SERVICE_ACCOUNT_JSON environment variable.",
    );
  }

  // Support both raw JSON and base64-encoded JSON
  const json = credentials.trimStart().startsWith("{")
    ? credentials
    : Buffer.from(credentials, "base64").toString("utf-8");

  const parsed = JSON.parse(json);

  return new google.auth.GoogleAuth({
    credentials: parsed,
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });
}

// ─── List images in a folder ──────────────────────────────────────────────────

export async function listDriveImages(folderId: string): Promise<DriveImage[]> {
  const auth = getAuth();
  const drive = google.drive({ version: "v3", auth });

  const res = await drive.files.list({
    q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
    fields: "files(id, name, mimeType)",
    orderBy: "name",
    pageSize: 100,
  });

  return (res.data.files ?? []) as DriveImage[];
}

// ─── Get a single file's image stream ────────────────────────────────────────

export async function getDriveImageStream(fileId: string) {
  const auth = getAuth();
  const drive = google.drive({ version: "v3", auth });

  const res = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "stream" },
  );

  return {
    stream: res.data as NodeJS.ReadableStream,
    contentType:
      (res.headers as Record<string, string>)["content-type"] ?? "image/jpeg",
  };
}
