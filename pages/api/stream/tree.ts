// pages/api/tree.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser';
import { StreamingTextResponse } from 'ai';

export const config = {
    runtime: 'edge'
};

export default async function handler(req: Request) {
    let counter = 0;
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    // const documents = (await req.json()) || {};

    console.log('Req Body:');
    // console.log(documents);

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
                    // console.log(data);
                    if (data === '[DONE]') {
                        controller.close();
                        return;
                    }
                    try {
                        // const json = JSON.parse(data);
                        // console.log(json);
                        // const text = json.choices[0].text;
                        const text = data;
                        // res.write(text);
                        // if (counter < 2 && (text.match(/\n/) || []).length) {
                        //     return;
                        // }
                        const queue = encoder.encode(text);
                        // const queue = encoder.encode(json);
                        controller.enqueue(queue);
                        counter++;
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
                // console.log('Chunk: ', chunk);
                parser.feed(decoder.decode(chunk));
            }
        }
    });

    return new StreamingTextResponse(stream);
}
