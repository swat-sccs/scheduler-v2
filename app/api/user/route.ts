// api/test.ts
import { NextResponse, NextRequest } from "next/server";

import prisma from "../../../lib/prisma";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const session = data?.session;

  const user = await prisma.user.upsert({
    where: {
      uuid: session?.user?.id,
    },
    update: {
      uuid: session?.user?.id,
      email: session?.user?.email,
      name: session?.user?.name,
    },
    create: {
      uuid: session?.user?.id,
      email: session?.user?.email,
      name: session?.user?.name,
    },
  });

  return NextResponse.json(user, { status: 200 });
}

export async function GET(request: NextRequest) {
  /*
  const session = data.session;
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });
*/
  return NextResponse.json("HI", { status: 200 });
}
// To handle a POST request to /api
/*
export async function POST(request: NextRequest) {

  return NextResponse.json(output, { status: 200 });
}
*/
