export async function pushLeadToGoogleSheets(payload: {
  fullName: string;
  email: string;
  consented: boolean;
  verified: boolean;
  source: string;
}) {
  const webhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhook) return;

  await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      createdAt: new Date().toISOString(),
    }),
    cache: "no-store",
  }).catch(() => null);
}