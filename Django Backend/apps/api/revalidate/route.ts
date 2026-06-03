// app/api/revalidate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const secret = process.env.NEXTJS_REVALIDATION_SECRET;

    // Validate webhook signature authenticity
    if (!secret || authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ message: "Invalid authorization signature token" }, { status: 401 });
    }

    const body = await request.json();
    const paths: string[] = body.paths;

    if (!paths || !Array.isArray(paths)) {
      return NextResponse.json({ message: "Payload missing standard paths collection array" }, { status: 400 });
    }

    // Process invalidation tags asynchronously over the App Router cache bounds
    for (const path of paths) {
      if (typeof path === "string" && path.startsWith("/")) {
        revalidatePath(path);
        console.log(`[ISR Cache Invalidation Engine] Flushed path: ${path}`);
      }
    }

    return NextResponse.json({ revalidated: true, processedPaths: paths }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server runtime execution error", error: String(error) }, { status: 500 });
  }
}