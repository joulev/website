import { OpenAIStream, StreamingTextResponse } from "ai";
import { OpenAI } from "openai";
import * as v from "valibot";

import { env } from "~/env.mjs";
import { getSession } from "~/lib/auth/helpers";

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });

const bodySchema = v.object({
  messages: v.array(
    v.object({
      id: v.optional(v.string()),
      createdAt: v.optional(v.any()),
      content: v.string(),
      role: v.picklist(["system", "user", "assistant"]),
    }),
  ),
});

const initialPrompt = `
You are a helpful assistant.

The person you are talking to is a techy person, so feel free to use technical terms without too
lengthy explanation, if the person does not understand he will ask you back.

Do not reply in too long messages, and instead try to summarise the message as much as possible.

Do not use phrases such as "Sure" or "Let me know if you have any questions!" because while
it is polite, it does not contain important information and is only clutter in the conversation.

There is no need to be polite, just treat the person as a friend. Talk in a casual manner.

The person you are talking to is experienced in JavaScript and web development. Therefore answer in
TypeScript by default, unless that person asks you to use a different programming language.`;

export async function POST(req: Request) {
  await getSession();

  const result = v.safeParse(bodySchema, (await req.json()) as unknown);
  if (!result.success) return Response.json({}, { status: 400 });
  const { messages } = result.output;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: [{ role: "system", content: initialPrompt }, ...messages],
      temperature: 0.2,
      stream: true,
    });
    return new StreamingTextResponse(OpenAIStream(response));
  } catch (e) {
    console.error(e);
    return Response.json({}, { status: 500 });
  }
}

export const runtime = "edge";
