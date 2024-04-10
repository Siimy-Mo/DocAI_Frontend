// import { NextRequest, NextResponse } from 'next/server';

// export function middleware(req: NextRequest) {
//     // const authorization = req.cookies.authorization;
//     const authorization = req.cookies.get('authorization');
//     if (authorization || req.url.indexOf('/miniapp') != -1) {
//         return NextResponse.next();
//     }
//     return NextResponse.rewrite(new URL('/login', req.url).toString());

//     // const basicAuth = req.headers.get('authorization');

//     // if (basicAuth) {
//     //     const auth = basicAuth.split(' ')[1];
//     //     const [user, pwd] = Buffer.from(auth, 'base64').toString().split(':');

//     //     if (user === process.env.NEXT_USER && pwd === process.env.NEXT_PASSWORD) {
//     //         return NextResponse.next();
//     //     }
//     //     return NextResponse.next();
//     // }

//     // return new Response('Auth required', {
//     //     status: 401,
//     //     headers: {
//     //         'WWW-Authenticate': 'Basic realm="Secure Area"'
//     //     }
//     // });
// }

// pages/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(req: NextRequest) {
    const authorization = req.cookies?.get('authorization');
    const url = req.nextUrl.clone();

    if (url.pathname === '/login') {
        return NextResponse.next();
    }

    if (authorization || url.pathname.includes('/miniapp')) {
        return NextResponse.next();
    }

    url.pathname = '/login';
    return NextResponse.redirect(url);
}