import { NextResponse, type NextRequest } from "next/server";

/**
 * POST /api/contact — sends contact form message via Resend to hello@endlessfounder.live.
 */

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "all fields required" }, { status: 400 });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Endless Founders <hello@endlessfounder.live>",
      to: ["cadenchiang@berkeley.edu", "henrykiamilev@gmail.com", "williammirhashemi2029@u.northwestern.edu"],
      replyTo: email,
      subject: `contact form: ${name}`,
      html: `
        <p><strong>from:</strong> ${name} (${email})</p>
        <p><strong>message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("contact form error:", err);
    return NextResponse.json({ error: "failed to send" }, { status: 500 });
  }
}
