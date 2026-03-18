import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email || !email.includes("@") || !email.includes(".")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const normalizedEmail = email.toLowerCase();

  const { data: existing } = await supabase
    .from("waitlist")
    .select("email")
    .eq("email", normalizedEmail)
    .single();

  if (existing) {
    return NextResponse.json(
      { error: "This email is already on the waitlist." },
      { status: 409 }
    );
  }

  const { error: insertError } = await supabase
    .from("waitlist")
    .insert({ email: normalizedEmail });

  if (insertError) {
    console.error("waitlist insert error:", {
      message: insertError.message,
      email: normalizedEmail,
    });
    return NextResponse.json({ error: "Failed to join waitlist" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
