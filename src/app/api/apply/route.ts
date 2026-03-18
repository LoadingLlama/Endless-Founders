import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * POST /api/apply — saves a full application to the Supabase `applications` table.
 * Uses service role key for server-side insert.
 *
 * @param request - JSON body with all application fields.
 * @returns 200 on success, 400 on validation error, 409 on duplicate, 500 on failure.
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

  // Check for duplicate application
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

  const application = {
    email,
    first_name: body.first_name?.trim(),
    last_name: body.last_name?.trim(),
    location: body.location?.trim() || null,
    linkedin: body.linkedin?.trim() || null,
    twitter: body.twitter?.trim() || null,
    website: body.website?.trim() || null,
    has_cofounder: body.has_cofounder ?? null,
    looking_for_cofounder: body.looking_for_cofounder ?? null,
    vision: body.vision?.trim() || null,
    building: body.building?.trim() || null,
    building_details: body.building_details?.trim() || null,
    why_this_idea: body.why_this_idea?.trim() || null,
    world_needs: body.world_needs?.trim() || null,
    traction: body.traction?.trim() || null,
    has_users: body.has_users ?? null,
    user_count: body.user_count?.trim() || null,
    has_revenue: body.has_revenue ?? null,
    accomplishments: body.accomplishments?.trim() || null,
    one_belief: body.one_belief?.trim() || null,
    has_legal_entity: body.has_legal_entity ?? null,
    equity_breakdown: body.equity_breakdown?.trim() || null,
    has_investment: body.has_investment ?? null,
    past_programs: body.past_programs?.trim() || null,
    how_heard: body.how_heard?.trim() || null,
    inspired_by: body.inspired_by?.trim() || null,
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
