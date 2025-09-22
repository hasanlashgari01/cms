import { NextRequest, NextResponse } from "next/server";
import { client } from "@/utils/supabase/server";

export async function middleware(request: NextRequest) {
  const supabase = await client();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const { data, error } = await supabase.from("users").select("role").eq("id", user.id).single();

  if (error || !data) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/dashboard") && data.role !== "user") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/admin") && data.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
