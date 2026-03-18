import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * POST /api/apply — saves application to Supabase `applications` table.
 * Only sends fields that exist in the table. Ignores unknown fields gracefully.
 */

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !email.includes("@") || !email.includes(".")) {
    return NextResponse.json({ error: "valid email required" }, { status: 400 });
  }

  if (!body.first_name?.trim() || !body.last_name?.trim()) {
    return NextResponse.json({ error: "name required" }, { status: 400 });
  }

  // Check for duplicate
  const { data: existing } = await supabase
    .from("applications")
    .select("email")
    .eq("email", email)
    .single();

  if (existing) {
    return NextResponse.json(
      { error: "an application with this email already exists." },
      { status: 409 }
    );
  }

  // Helper: trim string or null
  const s = (key: string) => body[key]?.trim() || null;
  const b = (key: string) => body[key] ?? null;

  const application = {
    email,
    first_name: s("first_name"),
    last_name: s("last_name"),
    age: s("age"),
    school: s("school"),
    major: s("major"),
    location: s("location"),
    linkedin: s("linkedin"),
    twitter: s("twitter"),
    accomplishments: s("accomplishments"),
    skills: s("skills"),
    past_programs: s("past_programs"),
    has_cofounder: b("has_cofounder"),
    looking_for_cofounder: b("looking_for_cofounder"),
    one_belief: s("one_belief"),
    stage: s("stage"),
    problem: s("problem"),
    building: s("building"),
    why_this_idea: s("why_this_idea"),
    target_user: s("target_user"),
    vision: s("vision"),
    talked_to_users: b("talked_to_users"),
    has_users: b("has_users"),
    user_count: s("user_count"),
    has_revenue: b("has_revenue"),
    revenue_amount: s("revenue_amount"),
    product_link: s("product_link"),
    why_ef: s("why_ef"),
    can_commit_6_weeks: b("can_commit_6_weeks"),
    full_time: b("full_time"),
    time_working: s("time_working"),
    other_commitments: s("other_commitments"),
    six_week_focus: s("six_week_focus"),
    has_investment: b("has_investment"),
    funding_details: s("funding_details"),
    funding_amount: s("funding_amount"),
    how_heard: s("how_heard"),
    anything_else: s("anything_else"),
  };

  const { error: insertError } = await supabase
    .from("applications")
    .insert(application);

  if (insertError) {
    console.error("application insert error:", {
      message: insertError.message,
      code: insertError.code,
      email,
    });
    return NextResponse.json({ error: "failed to submit application" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
