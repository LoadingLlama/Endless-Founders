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

  const { error } = await supabase
    .from("waitlist")
    .upsert({ email: email.toLowerCase() }, { onConflict: "email" });

  if (error) {
    console.error("waitlist insert error:", error.message);
    return NextResponse.json({ error: "Failed to join waitlist" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
