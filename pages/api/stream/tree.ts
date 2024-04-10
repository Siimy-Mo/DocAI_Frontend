// pages/api/tree.ts
import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser';
import { StreamingTextResponse } from 'ai';

export const config = {
    runtime: 'edge'
};

export default async function handler(req: Request) {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const response: any = await fetch(
        `${process.env.NEXT_PUBLIC_LCEL_FAST_API}/generate/search_documents/tree/stream`,
        {
            headers: {
                Connection: 'keep-alive',
                accept: 'text/event-stream',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(await req.json())
        }
    );

    const stream = new ReadableStream({
        async start(controller) {
            function onParse(event: ParsedEvent | ReconnectInterval) {
                if (event.type === 'event') {
                    const data = event.data;
                    if (data === '[DONE]') {
                        controller.close();
                        return;
                    }
                    try {
                        const text = data;
                        const queue = encoder.encode(text);
                        controller.enqueue(queue);
                    } catch (e) {
                        controller.error(e);
                    }
                }
            }

            // stream response (SSE) from OpenAI may be fragmented into multiple chunks
            // this ensures we properly read chunks & invoke an event for each SSE event stream
            const parser = createParser(onParse);

            // https://web.dev/streams/#asynchronous-iteration
            for await (const chunk of response.body as any) {
                parser.feed(decoder.decode(chunk));
            }
        }
    });

    return new StreamingTextResponse(stream);
}
