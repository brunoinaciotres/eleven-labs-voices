import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import {customAlphabet} from 'nanoid'

const nanoid = customAlphabet(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  7
)
export async function OPTIONS(request: Request) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function POST(request: Request ): Promise<NextResponse> {
  // const audioFile = request.body || ''
  
  // const audioFileName = `${nanoid()}.audio`
  // const contentType = request.headers.get('content-type') || 'text/plain'
  // const blobData = await put(audioFileName, audioFile, {
  //   contentType,
  //   access: 'public',

  // });
  // const response = NextResponse.next()
  // response.headers.set('Access-Control-Allow-Origin', '*')
  // response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  // response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
         
  // return NextResponse.json(blobData);
  const audioFile = await request.blob();
  const audioFileName = `${nanoid()}.audio`;
  const contentType = request.headers.get('content-type') || 'audio/mpeg';

  const blobData = await put(audioFileName, audioFile, {
    contentType,
    access: 'public',
  });

  return NextResponse.json(blobData, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}