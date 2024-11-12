// api/test.ts
import { NextResponse, NextRequest } from "next/server";

import prisma from "../../../lib/prisma";
import { auth } from "../../../lib/auth";
import { getPlanCookie } from "../../actions/actions";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const ratingID = data.ratingID;

  const courses = await prisma.rating.delete({
    where: {
      id: parseInt(ratingID),
    },
  });

  return NextResponse.json(courses, { status: 200 });
}
