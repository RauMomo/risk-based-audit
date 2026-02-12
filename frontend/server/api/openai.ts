import OpenAI from "openai";

export interface OpenAICompletionResponse {
  choices: Array<{
    text: string;
    finish_reason: string;
  }>;
  usage?: {
    total_tokens: number;
  };
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const completion = await client.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: body.prompt,
    max_tokens: 1000,
  });

  return completion;
});
