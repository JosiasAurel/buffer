import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getBuffer(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log(req.query);
  try {
    const buffer = await prisma.buffer.findUnique({
      where: {
        id: req.query.id as string,
      },
    });

    res.json({
      status: true,
      buffer,
    });
  } catch (error) {
    res.json({
      status: false,
    });
  }
  return prisma.$disconnect();
}
