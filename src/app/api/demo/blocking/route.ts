import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "Groq API key is not configured." },
        { status: 500 }
      );
    }

    const { text } = await generateText({
      model: groq("openai/gpt-oss-120b"),
      prompt: "Write a vegetarian lasagna recipe for 4 people.",
    });

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Groq API error:", error);

    return NextResponse.json(
      { error: "Failed to generate text. Check the server terminal." },
      { status: 500 }
    );
  }
}