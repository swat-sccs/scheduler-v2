import { NextResponse, NextRequest } from "next/server";

import prisma from "../../../lib/prisma";

export async function GET(request: NextRequest) {
  const profs = await prisma.rating.findMany({
    include: {
      User: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return NextResponse.json(profs, { status: 200 });
}
