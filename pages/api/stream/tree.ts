// pages/api/tree.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { StreamingTextResponse } from 'ai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            // const response: any = await fetch(
            //     `${process.env.NEXT_PUBLIC_LCEL_FAST_API}/generate/search_documents/tree/stream`,
            //     {
            //         method: 'POST',
            //         headers: {
            //             accept: 'text/plain',
            //             'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify(req.body)
            //     }
            // );

            const Uint8ArrayToString = (fileData: any) => {
                const utf8 = Array.from(fileData)
                    .map((item: any) => String.fromCharCode(item))
                    .join('');

                return decodeURIComponent(escape(utf8));
            };

            const fetchStream = (url: any, params: any) => {
                const { onmessage, onclose, ...otherParams } = params;

                const push = async (controller: any, reader: any) => {
                    const { value, done } = await reader.read();
                    if (done) {
                        controller.close();
                        onclose?.();
                    } else {
                        onmessage?.(Uint8ArrayToString(value));
                        controller.enqueue(value);
                        push(controller, reader);
                    }
                };

                return fetch(url, otherParams).then((response: any) => {
                    const reader = response.body.getReader();
                    return new ReadableStream({
                        start(controller) {
                            push(controller, reader);
                        }
                    });
                });
            };

            const stream = await fetchStream(
                `${process.env.NEXT_PUBLIC_LCEL_FAST_API}/generate/search_documents/tree/stream`,
                {
                    method: 'POST',
                    body: JSON.stringify(req.body),
                    headers: {
                        accept: 'text/event-stream',
                        'Content-Type': 'application/json'
                    },
                    onmessage: (response: any) => {
                        console.log(response);
                        // return new StreamingTextResponse(res)
                        res.write(response);
                    }
                }
            );

            // res.setHeader('Content-Type', 'text/event-stream');
            // const reader = response.body.getReader();

            // const stream = new ReadableStream({
            //     async start(controller) {
            //         while (true) {
            //             const { done, value } = await reader.read();
            //             if (done) {
            //                 break;
            //             }
            //             const chunk = new TextDecoder().decode(value);
            //             controller.enqueue(chunk);
            //         }
            //         controller.close();
            //         reader.releaseLock();
            //     }
            // });

            // if (res.socket?.writable) {
            //     stream.pipeTo(
            //         new WritableStream({
            //             write(chunk) {
            //                 res.write(chunk);
            //             },
            //             close() {
            //                 res.end();
            //             }
            //         })
            //     );
            // } else {
            //     res.status(503).end();
            // }

            console.log('Stream: ', stream);

            return new StreamingTextResponse(stream);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
