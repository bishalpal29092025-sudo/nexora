import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";
import { inngest } from "./client";

export const demoGenerate = inngest.createFunction(
  { id: "demo-generate" },
  { event: "demo/generate" },
  async ({ step }) => {
    const text = await step.run("generate-text", async () => {
      const { text } = await generateText({
        model: groq("openai/gpt-oss-120b"),
        prompt: "Write a vegetarian lasagna recipe for 4 people.",
      });

      return text;
    });

    return { text };
  }
);