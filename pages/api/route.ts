import { Ratelimit } from '@upstash/ratelimit'; 
import { kv } from '@vercel/kv'; 
import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(config);

// Set the runtime to edge to allow for Edge Streaming (https://vercel.fyi/streaming)
export const runtime = 'edge';

export async function POST(req: Request) {
  // Rate limiting için IP adresini alın
  const ip = req.headers.get('x-forwarded-for') || 'anonymous';

  // Ratelimiter oluşturun
  const ratelimit = new Ratelimit({
    redis: kv, // Vercel KV kullanımı
    limiter: Ratelimit.slidingWindow(5, '10s'), // 10 saniyede 5 istek sınırı
  });

  // Rate limit kontrolü
  const { success, limit, reset, remaining } = await ratelimit.limit(ip);

  if (!success) {
    return new Response('You have reached your request limit for the day.', {
      status: 429,
      headers: {
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString()
      }
    });
  }

  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: messages.map((message: any) => ({
      content: message.content,
      role: message.role
    }))
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
