// PUBLIC ENDPOINT — no auth required (applicant submits before they have a session)
// Proxies both emails (team notification + applicant confirmation) to Appointus,
// bypassing the browser CORS restriction that blocks direct fetch calls.

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }

  let body: {
    fullName: string;
    email: string;
    phone?: string;
    company?: string;
    tier: string;
    ticket: string;
    foundingFive: boolean;
    source?: string;
    notes?: string;
  };

  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }

  const { fullName, email, tier, ticket, foundingFive, phone, company, source, notes } = body;

  if (!fullName || !email || !tier) {
    return new Response(JSON.stringify({ error: 'Missing required fields: fullName, email, tier' }), {
      status: 422,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }

  const apiKey = Deno.env.get('APPOINTUS_API_KEY') ?? '061ac5ea-c9a6-4883-acd3-c21cdbb0dd62';
  const teamEmail = Deno.env.get('TEAM_EMAIL') ?? 'prabhjot.singh2475@gmail.com';
  const apiUrl = 'https://api.appointusonline.com/SendEmailWithFrom';

  function esc(s: string | undefined): string {
    return (s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ── Email #1 — team notification ───────────────────────────────────── */
  const teamBody = `
<div style="font-family:Inter,system-ui,sans-serif;color:#1b1b1b;max-width:640px;padding:40px;">
  <h2 style="font-family:Georgia,serif;font-weight:300;font-size:28px;margin:0 0 6px;color:#1b1b1b;">
    New investment application
  </h2>
  <p style="color:#575ecf;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;margin:0 0 32px;">
    Mosaic Venture Studio · mosaicventure.studio
  </p>
  <table style="width:100%;border-collapse:collapse;font-size:14px;border:1px solid #e5e5e5;">
    <tr style="background:#f8f8f8;">
      <td style="padding:12px 16px;color:#888;width:180px;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Full name</td>
      <td style="padding:12px 16px;font-weight:600;color:#1b1b1b;">${esc(fullName)}</td>
    </tr>
    <tr>
      <td style="padding:12px 16px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;border-top:1px solid #e5e5e5;">Email</td>
      <td style="padding:12px 16px;border-top:1px solid #e5e5e5;">
        <a href="mailto:${esc(email)}" style="color:#575ecf;text-decoration:none;font-weight:500;">${esc(email)}</a>
      </td>
    </tr>
    <tr style="background:#f8f8f8;">
      <td style="padding:12px 16px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;border-top:1px solid #e5e5e5;">Phone</td>
      <td style="padding:12px 16px;border-top:1px solid #e5e5e5;color:#1b1b1b;">${esc(phone) || '<span style="color:#ccc;">—</span>'}</td>
    </tr>
    <tr>
      <td style="padding:12px 16px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;border-top:1px solid #e5e5e5;">Company</td>
      <td style="padding:12px 16px;border-top:1px solid #e5e5e5;color:#1b1b1b;">${esc(company) || '<span style="color:#ccc;">—</span>'}</td>
    </tr>
    <tr style="background:#f8f8f8;">
      <td style="padding:12px 16px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;border-top:1px solid #e5e5e5;">Tier</td>
      <td style="padding:12px 16px;border-top:1px solid #e5e5e5;font-weight:600;color:#575ecf;">${esc(tier)}</td>
    </tr>
    <tr>
      <td style="padding:12px 16px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;border-top:1px solid #e5e5e5;">Ticket size</td>
      <td style="padding:12px 16px;border-top:1px solid #e5e5e5;font-weight:500;color:#1b1b1b;">${esc(ticket)}</td>
    </tr>
    <tr style="background:#f8f8f8;">
      <td style="padding:12px 16px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;border-top:1px solid #e5e5e5;">Founding Five</td>
      <td style="padding:12px 16px;border-top:1px solid #e5e5e5;font-weight:600;color:${foundingFive ? '#575ecf' : '#aaa'};">
        ${foundingFive ? '✅ Yes — requested' : 'No'}
      </td>
    </tr>
    <tr>
      <td style="padding:12px 16px;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;border-top:1px solid #e5e5e5;">Source</td>
      <td style="padding:12px 16px;border-top:1px solid #e5e5e5;color:#1b1b1b;">${esc(source) || '<span style="color:#ccc;">—</span>'}</td>
    </tr>
  </table>
  ${notes ? `
  <div style="margin-top:24px;padding:20px;background:#f8f8f8;border-left:3px solid #575ecf;">
    <div style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;margin-bottom:8px;">Notes</div>
    <div style="white-space:pre-wrap;font-size:14px;line-height:1.6;color:#1b1b1b;">${esc(notes)}</div>
  </div>` : ''}
  <div style="margin-top:32px;padding-top:24px;border-top:1px solid #e5e5e5;">
    <a href="mailto:${esc(email)}" style="display:inline-block;padding:12px 24px;background:#575ecf;color:#fff;font-size:14px;font-weight:500;text-decoration:none;border-radius:2px;">
      Reply to ${esc(fullName)} →
    </a>
  </div>
</div>`.trim();

  /* ── Email #2 — applicant confirmation ───────────────────────────────── */
  const firstName = fullName.split(' ')[0] || 'there';
  const applicantBody = `
<div style="font-family:Inter,system-ui,sans-serif;background:#dcdad5;padding:0;margin:0;">
  <div style="max-width:600px;margin:0 auto;padding:48px 40px;">
    <p style="color:#575ecf;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;margin:0 0 36px;">
      Mosaic Venture Studio · Oslo · 2026
    </p>
    <h1 style="font-family:Georgia,serif;font-weight:300;font-size:40px;line-height:1.05;margin:0 0 24px;color:#1b1b1b;">
      Thank you,<br/><span style="color:#575ecf;">${esc(firstName)}.</span>
    </h1>
    <p style="font-size:16px;line-height:1.7;margin:0 0 24px;color:#1b1b1b;">
      We've received your application to invest in Mosaic Venture Studio. A managing
      partner is reviewing it personally and will be in touch within
      <strong>48 hours</strong> to schedule a confidential call.
    </p>

    <div style="margin:32px 0;padding:24px 28px;background:#ffffff;border-left:3px solid #575ecf;">
      <div style="color:#888;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:16px;">
        Your application summary
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr>
          <td style="padding:6px 0;color:#888;width:140px;">Tier</td>
          <td style="padding:6px 0;font-weight:600;color:#1b1b1b;">${esc(tier)}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#888;border-top:1px solid #f0f0f0;">Ticket size</td>
          <td style="padding:6px 0;border-top:1px solid #f0f0f0;color:#1b1b1b;">${esc(ticket)}</td>
        </tr>
        ${foundingFive ? `
        <tr>
          <td style="padding:6px 0;color:#888;border-top:1px solid #f0f0f0;">Founding Five</td>
          <td style="padding:6px 0;border-top:1px solid #f0f0f0;font-weight:600;color:#575ecf;">Requested ✓</td>
        </tr>` : ''}
      </table>
    </div>

    <p style="font-size:15px;line-height:1.7;margin:24px 0;color:#1b1b1b;">
      While you wait, explore the 13 ventures already inside the studio —
      from WorkHub (60% allocated) to Keep (acquisition talks underway Q2 2026):
    </p>

    <div style="margin:0 0 28px;">
      <a href="https://mosaicventure.studio/projects"
         style="display:inline-block;padding:14px 28px;background:#1b1b1b;color:#dcdad5;font-size:14px;font-weight:500;text-decoration:none;margin-right:12px;margin-bottom:10px;">
        Browse the portfolio →
      </a>
      <a href="https://mosaicventure.studio/investors"
         style="display:inline-block;padding:14px 28px;border:1px solid rgba(0,0,0,0.25);color:#1b1b1b;font-size:14px;font-weight:500;text-decoration:none;margin-bottom:10px;">
        Investor case →
      </a>
    </div>

    <p style="font-size:14px;line-height:1.6;color:rgba(0,0,0,0.55);margin:0 0 8px;">
      Questions in the meantime?
      <a href="mailto:investment@mosaicventure.studio" style="color:#575ecf;text-decoration:none;">
        investment@mosaicventure.studio
      </a>
    </p>

    <div style="margin-top:48px;padding-top:28px;border-top:1px solid rgba(0,0,0,0.12);">
      <p style="font-family:Georgia,serif;font-style:italic;font-size:20px;line-height:1.4;margin:0 0 10px;color:#1b1b1b;">
        One investment. Every venture. Shared success.
      </p>
      <p style="color:rgba(0,0,0,0.4);font-size:12px;margin:0;">
        Mosaic Venture Studio · Oslo · 2026 · Confidential
      </p>
    </div>
  </div>
</div>`.trim();

  /* ── Fire both emails ─────────────────────────────────────────────────── */
  const sendEmail = async (to: string, subject: string, emailBody: string, from: string) => {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'accept': 'text/plain',
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: to, subject, body: emailBody, from }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`Appointus ${res.status}: ${text}`);
    }
    return res;
  };

  try {
    // Team notification is critical — throw if it fails
    await sendEmail(
      teamEmail,
      `Mosaic Application — ${fullName} · ${tier}${foundingFive ? ' · Founding Five' : ''}`,
      teamBody,
      fullName,
    );

    // Applicant confirmation is best-effort — log but don't fail
    sendEmail(
      email,
      'Your application — Mosaic Venture Studio',
      applicantBody,
      'Mosaic Venture Studio',
    ).catch((e) => console.warn('Applicant email failed (non-critical):', e));

    return new Response(
      JSON.stringify({ success: true, message: 'Application received. We will be in touch within 48 hours.' }),
      { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('send-application-email failed:', msg);
    return new Response(
      JSON.stringify({ error: 'Failed to send notification email', detail: msg }),
      { status: 502, headers: { ...CORS, 'Content-Type': 'application/json' } },
    );
  }
});