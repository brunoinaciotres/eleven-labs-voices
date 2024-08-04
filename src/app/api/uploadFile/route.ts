import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import {customAlphabet} from 'nanoid'

const nanoid = customAlphabet(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  7
)
 
export async function POST(request: Request ): Promise<NextResponse> {
  const audioFile = request.body || ''
  
  const audioFileName = `${nanoid()}.audio`
  const contentType = request.headers.get('content-type') || 'text/plain'
  const blobData = await put(audioFileName, audioFile, {
    contentType,
    access: 'public',
  });
 
  return NextResponse.json(blobData);
}