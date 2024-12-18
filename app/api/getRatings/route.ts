import { NextResponse, NextRequest } from "next/server";

import prisma from "../../../lib/prisma";

export async function GET(request: NextRequest) {
  const ratings = await prisma.rating.findMany({
    include: {
      User: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return NextResponse.json(ratings, { status: 200 });
}
