// POST localhost:3000/api/demo/background

import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const { ids } = await inngest.send({
      name: "demo/generate",
      data: {},
    });

    return NextResponse.json({
      status: "started",
      eventId: ids[0],
    });
  } catch (error) {
    console.log("Failed to trigger Gemini generation: ", error);

    return NextResponse.json(
      { error: "Failed to start background generation." },
      { status: 500 },
    );
  }
}
