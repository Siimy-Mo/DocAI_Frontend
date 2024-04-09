// pages/api/tree.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser';
import { StreamingTextResponse } from 'ai';

export const config = {
    supportsResponseStreaming: true,
    runtime: 'edge'
};

export default async function handler(req: NextApiRequest) {
    // const Uint8ArrayToString = (fileData: any) => {
    //     const utf8 = Array.from(fileData)
    //         .map((item: any) => String.fromCharCode(item))
    //         .join('');

    //     return decodeURIComponent(escape(utf8));
    // };

    // const fetchStream = (url: any, params: any) => {
    //     console.log(req.body);
    //     const { onmessage, onclose, ...otherParams } = params;

    //     const push = async (controller: any, reader: any) => {
    //         const { value, done } = await reader.read();
    //         if (done) {
    //             controller.close();
    //             onclose?.();
    //         } else {
    //             onmessage?.(Uint8ArrayToString(value));
    //             controller.enqueue(value);
    //             push(controller, reader);
    //         }
    //     };

    //     return fetch(url, otherParams).then((response: any) => {
    //         const reader = response.body.getReader();
    //         return new ReadableStream({
    //             start(controller) {
    //                 push(controller, reader);
    //             }
    //         });
    //     });
    // };

    // const stream = await fetchStream(
    //     `${process.env.NEXT_PUBLIC_LCEL_FAST_API}/generate/search_documents/tree/stream`,
    //     {
    //         method: 'POST',
    //         body: JSON.stringify(req.body),
    //         headers: {
    //             Connection: 'keep-alive',
    //             accept: 'text/event-stream',
    //             'Content-Type': 'application/json'
    //         },
    //         onmessage: (response: any) => {
    //             console.log(response);
    //         }
    //     }
    // );

    // return new StreamingTextResponse(stream);
    // return res.send(stream);

    let counter = 0;
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
            body: JSON.stringify(req.body)
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

    // const stream = new ReadableStream({
    //     async start(controller) {
    //         const decoder = new TextDecoder('utf-8');
    //         let buffer = '';

    //         async function processData(chunk: any) {
    //             console.log('Chunk: ', chunk);
    //             buffer += chunk;
    //             console.log('Buffer: ', buffer);
    //             const boundary = buffer.lastIndexOf('\n');

    //             if (boundary !== -1) {
    //                 const content = buffer.substring(0, boundary);
    //                 buffer = buffer.substring(boundary + 1); // 把剩余的数据保存到buffer中

    //                 for (const data of content.split('\n')) {
    //                     if (data.trim()) {
    //                         try {
    //                             const json = JSON.parse(data);
    //                             controller.enqueue(
    //                                 new TextEncoder().encode(JSON.stringify(json) + '\n')
    //                             );
    //                         } catch (e) {
    //                             controller.error(`Error parsing JSON: ${e}`);
    //                             controller.close();
    //                             break;
    //                         }
    //                     }
    //                 }
    //             }
    //         }

    //         try {
    //             const reader = response.body.getReader();
    //             let done, value;
    //             while ((({ done, value } = await reader.read()), !done)) {
    //                 const chunk = decoder.decode(value, { stream: true }); // 将Uint8Array解码为字符串
    //                 await processData(chunk);
    //             }
    //             await processData(decoder.decode()); // 确保处理所有剩余数据
    //             controller.close(); // 所有数据读取完毕，关闭控制器
    //         } catch (error) {
    //             controller.error(`Stream error: ${error}`);
    //         }
    //     }
    // });

    console.log(stream);

    return new StreamingTextResponse(stream);
}
