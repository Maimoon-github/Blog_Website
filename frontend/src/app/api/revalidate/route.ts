import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const secret = searchParams.get("secret");
    const path = searchParams.get("path");

    // Replace with actual secret key comparison if required
    if (secret !== "super-secret-token") {
      return NextResponse.json({ message: "Invalid secret token" }, { status: 401 });
    }

    if (!path) {
      return NextResponse.json({ message: "Path parameter is required" }, { status: 400 });
    }

    revalidatePath(path);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: "Error revalidating", error: String(err) }, { status: 500 });
  }
}
