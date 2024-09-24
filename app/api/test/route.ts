// api/test.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const users = await prisma.User.findMany();

  return NextResponse.json(users, { status: 200 });
}

// To handle a POST request to /api
/*
export async function POST(request: NextRequest) {
 
  return NextResponse.json(output, { status: 200 });
}
*/
