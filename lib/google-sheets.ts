type PushLeadInsertPayload = {
  action?: "insert";
  fullName: string;
  email: string;
  consented: boolean;
  verified: boolean;
  source: string;
};

type PushLeadVerifyPayload = {
  action: "verify";
  email: string;
};

type GoogleSheetsPayload = PushLeadInsertPayload | PushLeadVerifyPayload;

export async function pushLeadToGoogleSheets(payload: GoogleSheetsPayload) {
  const webhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhook) return;

  const body =
    payload.action === "verify"
      ? {
          action: "verify",
          email: payload.email.trim().toLowerCase(),
        }
      : {
          action: "insert",
          fullName: payload.fullName,
          email: payload.email.trim().toLowerCase(),
          consented: payload.consented,
          verified: payload.verified,
          source: payload.source,
          createdAt: new Date().toISOString(),
        };

  await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  }).catch(() => null);
}

export async function markLeadVerifiedInGoogleSheets(email: string) {
  await pushLeadToGoogleSheets({
    action: "verify",
    email,
  });
}