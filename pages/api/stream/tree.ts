// pages/api/tree.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { StreamingTextResponse } from 'ai';

// export const runtime = 'edge'; // or 'nodejs' which uses Serverless Functions
// export const dynamic = 'force-dynamic'; // always run dynamically

export const config = {
    supportsResponseStreaming: true,
    // runtime: 'edge',
    // dynamic: 'force-dynamic'
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 'no-cache, no-transform');
            res.setHeader('Connection', 'keep-alive');
            res.setHeader('accept', 'text/event-stream');
            // const Uint8ArrayToString = (fileData: any) => {
            //     const utf8 = Array.from(fileData)
            //         .map((item: any) => String.fromCharCode(item))
            //         .join('');

            //     return decodeURIComponent(escape(utf8));
            // };

            // const fetchStream = (url: any, params: any) => {
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
            //             // res.write(response);
            //         }
            //     }
            // );

            // return new StreamingTextResponse(stream);
            // return res.send(stream);

            const response = await fetch(
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

            const json = await response.text();

            console.log(json);

            res.status(200).send(json);
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
