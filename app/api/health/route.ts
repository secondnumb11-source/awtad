import { NextResponse } from "next/server";

export const runtime = "edge";

export function GET() {
  return NextResponse.json({ok:true,service:"awtad",version:"0.1.0"});
}
