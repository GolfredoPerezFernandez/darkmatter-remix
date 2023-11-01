import { ActionArgs } from "@remix-run/node";
import { useParams } from "@remix-run/react";
import { createLLMService } from "usellm";
 
export const runtime = "edge";
 
const llmService = createLLMService({
    openaiApiKey: "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",
    actions: ["chat"],
});
 
export const action = async ({ params, request }: ActionArgs) => {
  const body = await request.json();
 
  try {
    const { result } = await llmService.handle({ body, request });
    return new Response(result, { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: error?.status || 400 });
  }
};