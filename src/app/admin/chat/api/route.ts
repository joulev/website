import { openai } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  safeValidateUIMessages,
  streamText,
  toUIMessageStream,
} from "ai";

import { getSession } from "~/lib/auth/helpers";

const initialPrompt = `
You are a helpful assistant.

The person you are talking to is a techy person, so feel free to use technical terms without too
lengthy explanation, if the person does not understand he will ask you back.

Do not reply in too long messages, and instead try to summarise the message as much as possible.

Do not use phrases such as "Sure" or "Let me know if you have any questions!" because while
it is polite, it does not contain important information and is only clutter in the conversation.

There is no need to be polite, just treat the person as a friend. Talk in a casual manner.

The person you are talking to is experienced in JavaScript and web development. Therefore answer in
TypeScript by default, unless that person asks you to use a different programming language.

If you need to use math mode with LaTeX syntax for any reason, USE THE DOLLAR SYNTAX instead of
\`\\(\\)\` and \`\\[\\]\`. For example, write $a^2+b^2=c^2$ instead of \\(a^2+b^2=c^2\\), and write

$$
\\pi\\approx3.14
$$

instead of \\[\\pi\\approx3.14\\] or

\\[
\\pi\\approx3.14
\\]`;

export async function POST(req: Request) {
  await getSession();

  const body = (await req.json()) as { messages?: unknown };
  const validation = await safeValidateUIMessages({ messages: body.messages });
  if (!validation.success) return Response.json({}, { status: 400 });
  const messages = validation.data;

  try {
    const result = streamText({
      model: openai("gpt-5"),
      instructions: initialPrompt,
      messages: await convertToModelMessages(messages),
      temperature: 0.2,
    });
    const stream = toUIMessageStream({ stream: result.stream, originalMessages: messages });
    return createUIMessageStreamResponse({ stream });
  } catch (e) {
    console.error(e);
    return Response.json({}, { status: 500 });
  }
}

export const runtime = "edge";
export const preferredRegion = ["sin1", "hnd1"];
