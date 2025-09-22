import { supabase } from "@/utils/supabase/client";
import { NextRequest, NextResponse } from "next/server";

function toCSV(data: Record<string, string | number | Date | null>[]) {
  if (data.length === 0) return "";
  const header = Object.keys(data[0]).join(",") + "\n";
  const rows = data.map((row) => Object.values(row).join(",")).join("\n");
  return header + rows;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ entity: string; format: string }> },
) {
  const { entity, format } = await params;

  const { data, error } = await supabase.from(entity).select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data || data.length === 0) {
    return NextResponse.json({ error: "No data found" }, { status: 404 });
  }

  if (format === "json") {
    return new NextResponse(JSON.stringify(data, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename=${entity}.json`,
      },
    });
  }

  if (format === "csv") {
    const csv = toCSV(data);
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename=${entity}.csv`,
      },
    });
  }

  return NextResponse.json({ error: "Format not supported" }, { status: 400 });
}
