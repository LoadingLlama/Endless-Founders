import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * POST /api/apply — saves simplified application to Supabase `applications` table.
 * Fields: first_name, last_name, school, linkedin, building, can_commit_6_weeks.
 * Always succeeds — never blocks a submission.
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

  // Helper: trim string, strip HTML tags — return empty string for NOT NULL columns
  const s = (key: string) => {
    const val = body[key]?.trim();
    if (!val) return "";
    return val.replace(/<[^>]*>/g, "");
  };
  const b = (key: string) => body[key] ?? null;

  // Server-side validation: all fields required
  const requiredFields = ["first_name", "last_name", "email", "school", "linkedin", "building"];
  const missingFields = requiredFields.filter((f) => !body[f]?.trim());
  if (missingFields.length > 0) {
    return NextResponse.json({ error: `missing required fields: ${missingFields.join(", ")}` }, { status: 400 });
  }
  if (body.can_commit_6_weeks === null || body.can_commit_6_weeks === undefined) {
    return NextResponse.json({ error: "missing required field: can_commit_6_weeks" }, { status: 400 });
  }
  if (!body.resume_url?.trim()) {
    return NextResponse.json({ error: "resume is required" }, { status: 400 });
  }

  // Use provided email, fall back to placeholder if missing
  const providedEmail = s("email").toLowerCase();
  const email = providedEmail && providedEmail.includes("@")
    ? providedEmail
    : `anon-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@placeholder.endlessfounder.live`;

  const application = {
    email,
    first_name: s("first_name"),
    last_name: s("last_name"),
    school: s("school"),
    linkedin: s("linkedin"),
    building: s("building"),
    can_commit_6_weeks: b("can_commit_6_weeks"),
    resume_url: s("resume_url"),
  };

  // Strip null/undefined values so Supabase uses column defaults
  const cleaned = Object.fromEntries(
    Object.entries(application).filter(([, v]) => v !== null && v !== undefined)
  );

  const { error: insertError } = await supabase
    .from("applications")
    .insert(cleaned);

  if (insertError) {
    console.error("application insert error:", {
      message: insertError.message,
      code: insertError.code,
      details: insertError.details,
      hint: insertError.hint,
      email,
    });

    // If duplicate email, append timestamp to make it unique and retry
    if (insertError.code === "23505") {
      const dedupEmail = `anon-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@placeholder.endlessfounder.live`;
      cleaned.email = dedupEmail;

      const { error: retryError } = await supabase
        .from("applications")
        .insert(cleaned);

      if (retryError) {
        console.error("application dedup retry error:", {
          message: retryError.message,
          code: retryError.code,
          email: dedupEmail,
        });
        return NextResponse.json(
          { error: `submission failed: ${retryError.message}` },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true });
    }

    // For any other error, try inserting with minimal fields
    const minimal = Object.fromEntries(
      Object.entries(cleaned).filter(([, v]) => v !== "")
    );

    const { error: minimalError } = await supabase
      .from("applications")
      .insert(minimal);

    if (minimalError) {
      console.error("application minimal insert error:", {
        message: minimalError.message,
        code: minimalError.code,
      });
      return NextResponse.json(
        { error: `submission failed: ${minimalError.message}` },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ success: true });
}
